const fetchData = async (username) => {
  if (elements.tag.innerText.slice(1) == username) return;

  elements.loading.classList.remove("hidden");
  elements.data.classList.add("hidden");
  elements.error.classList.add("hidden");

  await fetch(`https://api.github.com/users/${username}`).then((response) => {
    if (response.ok) {
      return response.json().then((data) => updateData(data));
    }
    elements.loading.classList.add("hidden");
    elements.error.classList.remove("hidden");
    if (response.status == "403")
      elements.error.textContent = "Too many requests. Try again later.";
    else if (response.status == "404")
      elements.error.textContent = "User not found";
  });
};

const elements = {
  form: document.getElementById("search-form"),
  input: document.getElementById("username"),
  error: document.getElementById("input-error"),

  data: document.getElementById("data"),
  loading: document.getElementById("loading"),

  image: document.getElementById("user-img"),
  username: document.getElementById("user-name"),
  tag: document.getElementById("user-tag"),
  joined: document.getElementById("user-joined"),
  bio: document.getElementById("user-bio"),
  repos: document.getElementById("user-repos"),
  followers: document.getElementById("user-followers"),
  following: document.getElementById("user-following"),
  location: document.getElementById("user-location"),
  blog: document.getElementById("user-blog"),
  twitter: document.getElementById("user-twitter"),
  company: document.getElementById("user-company"),
};

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const createTwitterLink = (username) => {
  const link = document.createElement("a");
  link.href = `https://twitter.com/${username}`;
  link.innerText = `@${username}`;
  link.target = "blank";
  return link;
};

const createBlogLink = (blog) => {
  const link = document.createElement("a");
  link.innerText = blog;
  link.href = blog.includes("http") ? blog : `http://${blog}`;
  link.target = "blank";
  return link;
};

const updateData = (json) => {
  elements.bio.classList.remove("hidden");

  elements.image.src = json.avatar_url;
  elements.username.innerText = json.name || json.login;
  elements.tag.innerText = `@${json.login}`;

  const date = json.created_at.split("T")[0].split("-");
  elements.joined.innerHTML = `Joined ${date[2]} ${months[date[1] - 1]} ${
    date[0]
  }`;

  elements.bio.innerHTML = json.bio || "This profile has no bio";
  elements.repos.innerText = json.public_repos;
  elements.followers.innerText = json.followers;
  elements.following.innerText = json.following;

  json.location
    ? (elements.location.innerText = json.location) &&
      elements.location.classList.remove("info__item--disabled")
    : (elements.location.innerText = "Not Available") &&
      elements.location.classList.add("info__item--disabled");

  json.company
    ? (elements.company.innerText = json.company) &&
      elements.company.classList.remove("info__item--disabled")
    : (elements.company.innerText = "Not Available") &&
      elements.company.classList.add("info__item--disabled");

  json.twitter_username
    ? (elements.twitter.innerHTML = "") ||
      elements.twitter.append(createTwitterLink(json.twitter_username)) ||
      elements.twitter.classList.remove("info__item--disabled")
    : (elements.twitter.innerHTML = "Not Available") &&
      elements.twitter.classList.add("info__item--disabled");

  json.blog
    ? (elements.blog.innerHTML = "") ||
      elements.blog.append(createBlogLink(json.blog)) ||
      elements.blog.classList.remove("info__item--disabled")
    : (elements.blog.innerHTML = "Not Available") &&
      elements.blog.classList.add("info__item--disabled");

  elements.data.classList.remove("hidden");
  elements.loading.classList.add("hidden");
};

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchData(elements.input.value);
});
