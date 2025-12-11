
const noteBtn = document.querySelector(".btn");
const noteContainer = document.querySelector(".note-container");

noteBtn.addEventListener("click", (e)=>{
    AddNotes();
});

function SaveNotes(){
    const titles = document.querySelectorAll(".note .note-title");
    const contents = document.querySelectorAll(".note .content");
    
    const data = [];
    contents.forEach((content, index) =>{
        const noteValue = content.value;
        const title = titles[index].value;
        if(noteValue.trim() !== ""){
            data.push({title, noteValue})
        }
    });

    const titlesData = data.map((item) => item.title);
    localStorage.setItem("titles", JSON.stringify(titlesData));

    const contentsData = data.map((item) => item.noteValue);
    localStorage.setItem("contents", JSON.stringify(contentsData));
}

function AddNotes(title="", content=""){
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div  class="icons">
    <i class="fa-solid fa-trash" id="delete-note"></i>
    <i class="fa-solid fa-floppy-disk" id="save-note"></i>
    </div>
    <div class="title-div">
        <textarea placeholder="Enter a title" class="note-title">${title}</textarea>
    </div>
    <textarea class="content" placeholder="Enter your note here">${content}</textarea>
    `;

   
    const deleteNote = note.querySelector("#delete-note");
    const save = note.querySelector("#save-note");

    deleteNote.addEventListener("click", ()=>{
        note.remove();
        SaveNotes()
    });

    save.addEventListener("click", ()=>{
        SaveNotes();  
    });

    noteContainer.appendChild(note);
    SaveNotes();
}

function loadNotes(){
    const titles = JSON.parse(localStorage.getItem("titles")) || [];
    const contents = JSON.parse(localStorage.getItem("contents")) || [];

    for(let i=0; i<Math.max(titles.length, contents.length); i++){
        AddNotes(titles[i], contents[i]);
    }
}

loadNotes();

