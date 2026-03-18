export interface Project {
  id: string;
  firstName: string;
  lastName: string;
  type: "Wedding" | "Graduation" | "Portrait" | "Music Video" | "Event";
  coverImage: string;
  coverImageBlur: string;
  description: string;
  venue: string;
  location: string;
  format: string;
  albumImages: {
    src: string;
    blur: string;
    width: number;
    height: number;
    alt: string;
  }[];
}

const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAA/9k=";

const cdn = (id: string, asset: string) => `crafteako/projects/${id}/${asset}`;

export const projects: Project[] = [
  {
    id: "xavier",
    firstName: "Xavier",
    lastName: "Murray",
    type: "Graduation",
    coverImage: cdn("xavier", "cover"),
    coverImageBlur: BLUR_PLACEHOLDER,
    description:
      "From classrooms to ecosystems, from theory to discovery—Xavier, you're now equipped to shape the future of our living world. Here's to the class of 2025.",
    venue: `Strong Hall KU biodiversity Museum KU Memorial Campenile`,
    location: "University of Kansas",
    format: "Photo Album",
    albumImages: [
      {
        src: cdn("xavier", "img-01"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 900,
        alt: "Xavier Image 1",
      },
      {
        src: cdn("xavier", "img-02"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 850,
        alt: "Xavier behind-the-scenes moment",
      },
      {
        src: cdn("xavier", "img-03"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-04"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-05"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-06"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-07"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-08"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-09"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-10"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-11"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-12"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-13"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-14"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-15"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-16"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-17"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-18"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-19"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
      {
        src: cdn("xavier", "img-20"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Xavier final frame",
      },
    ],
  },
  {
    id: "mariska",
    firstName: "Mariska",
    lastName: "Rai",
    type: "Portrait",
    coverImage: cdn("mariska", "cover"),
    coverImageBlur: BLUR_PLACEHOLDER,
    description:
      "A portrait narrative focused on poise, identity, and minimalist composition with soft directional light.",
    venue: "Private Studio",
    location: "Kathmandu",
    format: "Portrait Session",
    albumImages: [
      {
        src: cdn("mariska", "img-01"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 1000,
        alt: "Mariska portrait session",
      },
      {
        src: cdn("mariska", "img-02"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 800,
        alt: "Mariska lifestyle portrait",
      },
      {
        src: cdn("mariska", "img-03"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 1100,
        alt: "Mariska editorial portrait",
      },
    ],
  },
  {
    id: "paperplane",
    firstName: "Paper",
    lastName: "Plane",
    type: "Graduation",
    coverImage: cdn("paperplane", "cover"),
    coverImageBlur: BLUR_PLACEHOLDER,
    description:
      "A high-energy event gallery with candid interactions, layered details, and cinematic movement.",
    venue: "Creative Venue",
    location: "Lalitpur",
    format: "Event Coverage",
    albumImages: [
      {
        src: cdn("paperplane", "img-01"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 1000,
        alt: "Paperplane event opening",
      },
      {
        src: cdn("paperplane", "img-02"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 900,
        alt: "Paperplane crowd candid",
      },
      {
        src: cdn("paperplane", "img-03"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 900,
        alt: "Paperplane closing scene",
      },
    ],
  },
  {
    id: "sagar",
    firstName: "Sagar",
    lastName: "Shrestha",
    type: "Graduation",
    coverImage: cdn("sagar", "cover"),
    coverImageBlur: BLUR_PLACEHOLDER,
    description:
      "A celebratory graduation series balancing formal portraits with spontaneous moments and movement.",
    venue: "University Campus",
    location: "Kathmandu",
    format: "Graduation Session",
    albumImages: [
      {
        src: cdn("sagar", "img-01"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 1000,
        alt: "Sagar graduation portrait",
      },
      {
        src: cdn("sagar", "img-02"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 850,
        alt: "Sagar graduation candid",
      },
      {
        src: cdn("sagar", "img-03"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 1100,
        alt: "Sagar celebration moment",
      },
    ],
  },
  {
    id: "sarthak",
    firstName: "Sarthak",
    lastName: "Baral",
    type: "Portrait",
    coverImage: cdn("sarthak", "cover"),
    coverImageBlur: BLUR_PLACEHOLDER,
    description:
      "An event-focused album with mixed lighting, atmosphere details, and dynamic documentary-style framing.",
    venue: "City Venue",
    location: "Bhaktapur",
    format: "Event Coverage",
    albumImages: [
      {
        src: cdn("sarthak", "img-01"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 1000,
        alt: "Sarthak event portrait",
      },
      {
        src: cdn("sarthak", "img-02"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 900,
        alt: "Sarthak event details",
      },
      {
        src: cdn("sarthak", "img-03"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 850,
        alt: "Sarthak event crowd",
      },
    ],
  },
  {
    id: "sneha",
    firstName: "Sneha",
    lastName: "Shrestha",
    type: "Portrait",
    coverImage: cdn("sneha", "cover"),
    coverImageBlur: BLUR_PLACEHOLDER,
    description:
      "A warm portrait sequence designed around calm pacing, clean backdrop choices, and expressive detail shots.",
    venue: "Lifestyle Set",
    location: "Kathmandu",
    format: "Portrait Session",
    albumImages: [
      {
        src: cdn("sneha", "img-01"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 1200,
        alt: "Sneha portrait close-up",
      },
      {
        src: cdn("sneha", "img-02"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 1000,
        alt: "Sneha natural light portrait",
      },
      {
        src: cdn("sneha", "img-03"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 900,
        alt: "Sneha editorial portrait",
      },
    ],
  },
  {
    id: "bijay",
    firstName: "Bijay",
    lastName: "Shrestha",
    type: "Graduation",
    coverImage: cdn("bijay", "cover"),
    coverImageBlur: BLUR_PLACEHOLDER,
    description:
      "A clean, editorial portrait session built around natural movement, sharp styling, and expressive framing.",
    venue: "Studio Session",
    location: "Kathmandu",
    format: "Portrait Session",
    albumImages: [
      {
        src: cdn("bijay", "img-01"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 1200,
        alt: "Bijay portrait close-up",
      },
      {
        src: cdn("bijay", "img-02"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 1000,
        alt: "Bijay natural light portrait",
      },
      {
        src: cdn("bijay", "img-03"),
        blur: BLUR_PLACEHOLDER,
        width: 800,
        height: 900,
        alt: "Bijay studio portrait",
      },
    ],
  },
];
