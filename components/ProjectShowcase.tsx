"use client";

import { useRef, useLayoutEffect, useState, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useCursorContext } from "@/lib/cursorContext";
import { projects } from "@/data/projects";

export default function ProjectShowcase() {
  const { setState } = useCursorContext();
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Track which project images are rendered (for crossfade)
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Refs for each project's image element (for crossfade opacity)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateProject = useCallback((index: number, progress: number) => {
    if (index === activeIndexRef.current) return;
    const prev = activeIndexRef.current;
    activeIndexRef.current = index;
    setActiveIndex(index);

    const project = projects[index];

    // Slide names out then in
    gsap.to([firstNameRef.current, lastNameRef.current], {
      opacity: 0,
      x: (i) => (i === 0 ? -60 : 60),
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        if (firstNameRef.current)
          firstNameRef.current.textContent = project.firstName;
        if (lastNameRef.current)
          lastNameRef.current.textContent = project.lastName;
        if (categoryRef.current)
          categoryRef.current.textContent = `${project.type} ${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

        gsap.fromTo(
          [firstNameRef.current, lastNameRef.current],
          { opacity: 0, x: (i) => (i === 0 ? 60 : -60) },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        );
      },
    });

    // Crossfade images
    if (imageRefs.current[prev]) {
      gsap.to(imageRefs.current[prev], {
        opacity: 0,
        scale: 1.04,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (imageRefs.current[index]) {
      gsap.fromTo(
        imageRefs.current[index],
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      );
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize text content
      if (firstNameRef.current)
        firstNameRef.current.textContent = projects[0].firstName;
      if (lastNameRef.current)
        lastNameRef.current.textContent = projects[0].lastName;
      if (categoryRef.current)
        categoryRef.current.textContent = `${projects[0].type} 01 / ${String(projects.length).padStart(2, "0")}`;

      // Show first image, hide rest
      imageRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
      });

      const totalScroll = projects.length * 100; // vh equivalent handled by pin duration

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${projects.length * window.innerHeight}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIndex = progress * projects.length;
          const index = Math.min(Math.floor(rawIndex), projects.length - 1);

          // Update progress bar
          if (progressFillRef.current) {
            gsap.set(progressFillRef.current, { width: `${progress * 100}%` });
          }

          // Switch project when index changes
          updateProject(index, progress);

          // Warp / velocity distortion
          const velocity = self.getVelocity();
          const normalizedVelocity = velocity / 1000;
          const skewAmount = Math.max(
            -8,
            Math.min(8, normalizedVelocity * -0.3),
          );
          const scaleY = 1 - Math.abs(normalizedVelocity) * 0.015;

          gsap.to(imageWrapperRef.current, {
            skewY: skewAmount,
            scaleY: Math.max(0.92, scaleY),
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });

          // Snap back when velocity is near zero
          if (Math.abs(velocity) < 5) {
            gsap.to(imageWrapperRef.current, {
              skewY: 0,
              scaleY: 1,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
              overwrite: "auto",
            });
          }
        },
      });

      return () => trigger.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [updateProject]);

  return (
    <section
      id="work"
      ref={sectionRef}
      onMouseEnter={() => setState("drag")}
      onMouseLeave={() => setState("default")}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#F5F2ED",
      }}
    >
      {/* Category label — top left */}
      <div
        ref={categoryRef}
        style={{
          position: "absolute",
          top: "clamp(24px, 4vw, 48px)",
          left: "clamp(24px, 5vw, 80px)",
          zIndex: 10,
          fontFamily: "var(--font-inter)",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "rgba(35,35,35,0.4)",
        }}
      />

      {/* First name — far left, vertically centered */}
      <div
        ref={firstNameRef}
        style={{
          position: "absolute",
          left: "5vw",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          fontFamily: "var(--font-playfair)",
          fontSize: "5vw",
          color: "#232323",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          userSelect: "none",
        }}
      />

      {/* Last name — far right, vertically centered */}
      <div
        ref={lastNameRef}
        style={{
          position: "absolute",
          right: "5vw",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          fontFamily: "var(--font-playfair)",
          fontSize: "5vw",
          color: "#232323",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          textAlign: "right",
          userSelect: "none",
        }}
      />

      {/* Center image area — velocity-distorted wrapper */}
      <div
        ref={imageWrapperRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) translateZ(0)",
          width: "46vw",
          height: "68vh",
          zIndex: 5,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Stack all project images; crossfade between them */}
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "4px",
              overflow: "hidden",
              opacity: i === 0 ? 1 : 0,
              pointerEvents: i === activeIndex ? "auto" : "none",
            }}
          >
            <Link
              href={`/albums/${project.id}`}
              onMouseEnter={() => setState("view")}
              onMouseLeave={() => setState("drag")}
              style={{ display: "block", width: "100%", height: "100%" }}
              aria-label={`View ${project.firstName} ${project.lastName} album`}
            >
              <CldImage
                src={project.coverImage}
                alt={`${project.firstName} ${project.lastName} — ${project.type}`}
                fill
                sizes="(max-width: 768px) 100vw, 46vw"
                loading="lazy"
                format="auto"
                quality="auto"
                style={{ objectFit: "cover", objectPosition: "center" }}
                placeholder="blur"
                blurDataURL={project.coverImageBlur}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Progress bar — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "#E4E1DB",
          zIndex: 10,
        }}
      >
        <div
          ref={progressFillRef}
          style={{
            height: "100%",
            width: "0%",
            backgroundColor: "#232323",
            transformOrigin: "left center",
          }}
        />
      </div>
    </section>
  );
}
