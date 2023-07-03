// const btn = document.querySelector("#btn-submit");
// const msg = document.querySelector("#chat-message");
// const input = document.querySelector("#user-input");

const CHANNEL_ID = "O05N1l4gI40CJNJP";
const drone = new ScaleDrone(CHANNEL_ID, {
  data: {
    name: getRandomName(),
    color: getRandomColor(),
  },
});

function getRandomName() {
  const adjs = [
    "autumn",
    "hidden",
    "bitter",
    "misty",
    "silent",
    "empty",
    "dry",
    "dark",
    "summer",
    "icy",
    "delicate",
    "quiet",
    "white",
    "cool",
    "spring",
    "winter",
    "patient",
    "twilight",
    "dawn",
    "crimson",
    "wispy",
    "weathered",
    "blue",
    "billowing",
    "broken",
    "cold",
    "damp",
    "falling",
    "frosty",
    "green",
    "long",
    "late",
    "lingering",
    "bold",
    "little",
    "morning",
    "muddy",
    "old",
    "red",
    "rough",
    "still",
    "small",
    "sparkling",
    "throbbing",
    "shy",
    "wandering",
    "withered",
    "wild",
    "black",
    "young",
    "holy",
    "solitary",
    "fragrant",
    "aged",
    "snowy",
    "proud",
    "floral",
    "restless",
    "divine",
    "polished",
    "ancient",
    "purple",
    "lively",
    "nameless",
  ];
  const noums = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow",
    "leaf",
    "dawn",
    "glitter",
    "forest",
    "hill",
    "cloud",
    "meadow",
    "sun",
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
    "firefly",
    "feather",
    "grass",
    "haze",
    "mountain",
    "night",
    "pond",
    "darkness",
    "snowflake",
    "silence",
    "sound",
    "sky",
    "shape",
    "surf",
    "thunder",
    "violet",
    "water",
    "wildflower",
    "wave",
    "water",
    "resonance",
    "sun",
    "wood",
    "dream",
    "cherry",
    "tree",
    "fog",
    "frost",
    "voice",
    "paper",
    "frog",
    "smoke",
    "star",
  ];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    noums[Math.floor(Math.random() * noums.length)]
  );
}

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

drone.on("open", (error) => {
  if (error) {
    return console.error(error);
  }
  console.log("Seccesfully connected to Scaledrone");

  const room = drone.subscribe("observable-room");
  room.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    console.log("Seccessfully joind room");
  });

  // lista sudionika koji su online
  room.on("members", (m) => {
    members = m;
    // updateMembersDOM();
  });

  // sudionici koji su u chat sobi
  room.on("members_join", (member) => {
    members.push(member);
    // updateMembersDOM();
  });

  // sudionici koji su izašli iz sobe
  room.on("members_leave", ({ id }) => {
    const index = members.findIndex((member) => member.id === id);
    members.splice(index, 1);
    // updateMembersDOM();
  });

  room.on("data", (text, member) => {
    if (member) {
      // addMessageToListDOM(text, member)
    } else {
      // Message dolazi sa servera
    }
  });
});

// Moram dodati UI code sa scaldrone webstranice
