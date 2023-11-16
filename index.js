const path = require("path");
const fs = require("mz/fs");
const colors = require("colors/safe");

const FRAMES_PATH = "frames";
const COLORS = ["red", "yellow", "green", "blue", "magenta", "cyan", "white"];

let original;

(async () => {
  const files = await fs.readdir(FRAMES_PATH);

  original = await Promise.all(
    files.map(async (file) => {
      const frame = await fs.readFile(path.join(FRAMES_PATH, file));

      return frame.toString();
    })
  );

  streamer();
})().catch((err) => {
  console.log("Error loading frames");
  console.log(err);
});

const streamer = () => {
  let index = 0;
  let lastColor;
  const frames = original;

  return setInterval(() => {
    console.clear();

    const newColor = (lastColor = selectColor(lastColor));

    console.log(colors[COLORS[newColor]](frames[index]));

    index = (index + 1) % frames.length;
  }, 70);
};

const selectColor = (previousColor) => {
  let color;

  do {
    color = Math.floor(Math.random() * COLORS.length);
  } while (color === previousColor);

  return color;
};
