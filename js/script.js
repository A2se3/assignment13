var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var submitBtn = document.getElementById("submitBtn")
var boxModal = document.querySelector(".modal");
var closeBttn = document.querySelector(".closeBtn")
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
var bookmarks = []



submitBtn.addEventListener("click", addBookmark)

if (localStorage.getItem("bookmarks") != null) { 
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    disblayBookmark(bookmarks)
}


function addBookmark() { 
    bookmarksObject = { 
        name: siteName.value,
        url: siteUrl.value
    }

    if (Url(`${bookmarksObject.url}`)) { 
    } else { 
        var URL = `https://${siteUrl.value}`;
        bookmarksObject.url =  URL
    }

    console.log(bookmarksObject.url);

    if(siteName.value != "" && siteUrl.value != "") { 
        bookmarks.push(bookmarksObject)
        setLocalStorage()
        siteName.classList.add("is-valid")
        siteUrl.classList.add("is-valid")
        disblayBookmark(bookmarks)
        clear()
        

    }  else { 
        boxModal.classList.add("d-block")
    }





    
}

function disblayBookmark(list) { 

    var cartona = ``

    for (var i = 0 ; i < bookmarks.length ; i++ ) {
        cartona += `
        <tr>
        <td scope="row" class="p-3">${i+1}</td>
        <td>${bookmarks[i].name}</td>
        <td>
            <div class="btn btn-success">
                <a href="${bookmarks[i].url}" target="blank" class="text-decoration-none text-white">
                    Visit
                </a>
            </div>
        </td>
        <td>
            <button onclick="deleteBookmark(${i})" class="btn btn-danger">           
                    Delete
            </button>
        </td>
        
    </tr>
    
        `
    }

    document.getElementById("t-body").innerHTML = cartona
    
}

function deleteBookmark(index) { 
    bookmarks.splice(index,1)
    setLocalStorage() 
    disblayBookmark(bookmarks)
}

function clear() { 
    siteName.value = ""
    siteUrl.value = ""
}

function setLocalStorage() { 
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
}

function closeModal() { 
    closeBttn.addEventListener("click", function() { 
        boxModal.classList.remove("d-block")
    })
}


siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteUrl.addEventListener("input", function () {
    validate(siteUrl, urlRegex);
});

function validate(element, regex) {
    var testRegex = regex;
        if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
        } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    }
}

function Url(siteUrl) { 
    return URL.canParse(siteUrl)
}

