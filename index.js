"use strict"

const noteContainer = document.querySelector(".note-container");
const btnAddNotes = document.querySelector(".btn");

btnAddNotes.addEventListener("click", function(e){
    e.preventDefault();
    addNotes();
});

const saveNotes = function(){
    const data = [];
    const noteContents  = document.querySelectorAll(".note .content");
    const noteTitles = document.querySelectorAll(".note .title");
    console.log(noteContents);
    console.log(noteTitles);

    noteContents.forEach((note, index) =>{
        const content = note.value;
        console.log(content);
        const title = noteTitles[index].value;
        if(content.trim() !== ""){
            data.push({title, content});
        }
    });

    const titlesData = data.map((item) => item.title);
    localStorage.setItem("titles", JSON.stringify(titlesData));

    const contentData = data.map((item) => item.content);
    localStorage.setItem("contents", JSON.stringify(contentData));
};


const addNotes = function(title="", content=""){
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `<div class="icons">
        <i class="save fas fa-save" style="color:red"></i>
        <i class="trash fas fa-trash" style="color:yellow"></i> 
    </div>
    <div class="title-div">
        <textarea class="title" placeholder="Write a title...">${title}</textarea>
    </div>
    <textarea class="content" placeholder="Write a content...">${content}</textarea>
    `;
    noteContainer.appendChild(note);

    const save = note.querySelector(".save");
    const trash = note.querySelector(".trash");
    saveNotes();

    save.addEventListener("click", function(e){
        e.preventDefault();
        saveNotes();
    });

    trash.addEventListener("click", function(e){
        e.preventDefault();
        note.remove();
        saveNotes();
    });
}

function loadData(){
    const titles = JSON.parse(localStorage.getItem("titles")) || [];
    const contents = JSON.parse(localStorage.getItem("contents")) || [];

    for(let i=0; i< Math.max(titles.length, contents.length); i++){
        const title = titles[i]?? "(no title)";
        const content = contents[i]?? "(no content)";
        addNotes(title, content);
    };
} 

loadData();

    