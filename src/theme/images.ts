// Central registry of curated assets. Keeping every require() here means the
// long generated filenames in /assets never leak into component code.

export const images = {
  // Blurred background wallpaper used behind every screen.
  wallpaper: require("../../assets/final-temple-renders_9-Photo-1-1290x725.jpg"),

  // Splash screen background — temple facade render, shown mostly unblurred
  // so it actually reads as the temple rather than an abstract wash.
  splashBackground: require("../../assets/final-temple-renders_4-Photo-1290x725.jpg"),

  // Splash screen + header mark — the temple's official logo.
  ganeshaMark: require("../../assets/cropped-ganesha_logo.png"),

  // Home screen image carousel (5 highest-resolution, landscape-friendly shots).
  carousel: [
    {
      image: require("../../assets/final-temple-renders_4-Photo-1290x725.jpg"),
      caption: "Temple facade render",
    },
    {
      image: require("../../assets/final-temple-renders_9-Photo-1-1290x725.jpg"),
      caption: "Golden gopuram",
    },
    {
      image: require("../../assets/final-temple-renders_3-Photo-1-copy-1290x725.jpg"),
      caption: "Golden roof detail",
    },
    {
      image: require("../../assets/436305606_432691882802998_3708584196008910978_n-e1718915503546-840x473.jpg"),
      caption: "Lord Ganesha idol",
    },
    {
      image: require("../../assets/DSC09614-2048x1366.jpg"),
      caption: "Sanctum shrine",
    },
  ],

  // Gallery screen.
  gallery: [
    { id: "g1", image: require("../../assets/LORD-SHIVA-410x547.jpg"), caption: "Lord Shiva", height: 210 },
    { id: "g2", image: require("../../assets/DSC09918-scaled.jpg"), caption: "Homam ceremony", height: 260 },
    { id: "g3", image: require("../../assets/DEVI-GAURI-410x547.jpg"), caption: "Devi Gauri", height: 190 },
    { id: "g4", image: require("../../assets/final-temple-renders_4-Photo-1290x725.jpg"), caption: "Temple render", height: 160 },
    { id: "g5", image: require("../../assets/LORD-MURUGAR-410x547.jpg"), caption: "Lord Murugan", height: 230 },
    { id: "g6", image: require("../../assets/DSC09672-scaled.jpg"), caption: "Temple rituals", height: 180 },
    { id: "g7", image: require("../../assets/Navagraha-410x547.jpg"), caption: "Navagraha", height: 200 },
    { id: "g8", image: require("../../assets/LORD-HANUMAN-410x547.jpg"), caption: "Lord Hanuman", height: 220 },
    { id: "g9", image: require("../../assets/sai-410x547.jpg"), caption: "Shirdi Sai Baba", height: 190 },
    { id: "g10", image: require("../../assets/LORD-RAM-410x547.jpg"), caption: "Lord Rama", height: 210 },
  ],
};
