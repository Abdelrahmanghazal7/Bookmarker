var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var invaildName = document.getElementById("invaildName");
var invaildURL = document.getElementById("invaildURL");
var bookmarks;

if (localStorage.getItem("bookmarksList") == null) {
  bookmarks = [];
} else {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  displayBookmark(bookmarks);
}

function addWebsite() {

  if (validate() == true) {

    var site = {
      name: siteName.value,
      url: siteURL.value
    }

    bookmarks.push(site);

    displayBookmark(bookmarks);

    clear();

    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  }
}

function displayBookmark(site) {

  var cartona = ``;

  for (let i = 0; i < site.length; i++) {

    cartona += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${site[i].name}</td>
        <td>
        <button class="btn btn-visit" onclick="visitSite(${i})">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
      </td>
      <td>
        <button class="btn btn-delete pe-2" onclick="deleteSite(${i})">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
      </td>
    </tr>
    `
  }

  tableContent.innerHTML = cartona;
}

function deleteSite(index) {
  bookmarks.splice(index, 1)

  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks))

  displayBookmark(bookmarks)
}

function visitSite(index) {

  open(bookmarks[index].url);

}

function clear() {
  siteName.value = '';
  siteURL.value = '';
}

function validateSiteName() {

  var nameRegex = /^\w{3,}$/;

  if (nameRegex.test(siteName.value) == true) {
    invaildName.classList.add("d-none");
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
    return true;
  } else {
    invaildName.classList.remove("d-none");
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
    return false;
  }
}

function validateSiteURL() {

  var urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  if (urlRegex.test(siteURL.value) == true) {
    invaildURL.classList.add("d-none");
    siteURL.classList.remove("is-invalid");
    siteURL.classList.add("is-valid");
    return true;
  } else {
    invaildURL.classList.remove("d-none");
    siteURL.classList.remove("is-valid");
    siteURL.classList.add("is-invalid");
    return false;
  }
}

function validate() {
  if (validateSiteName() == true && validateSiteURL() == true) {
    return true;
  } else {
    return false;
  }
}