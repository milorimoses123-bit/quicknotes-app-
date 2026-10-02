document.addEventListener("DOMContentLoaded", () => {
    const noteForm = document.getElementById("note-form");
    const noteInput = document.getElementById("note-input");
    const noteCategory = document.getElementById("note-category");
    const errorMessage = document.getElementById("error-message");
    const notesList = document.getElementById("notes-list");
    const noteCount = document.getElementById("note-count");
    const searchBox = document.getElementById("search-box");

    let notes = [];

    noteForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const text = noteInput.value.trim();
        const category = noteCategory.value;

        if (text === "") {
            errorMessage.textContent = "Please enter a note before adding!";
            return;
        }

        errorMessage.textContent = "";

        const newNote = {
            id: Date.now(),
            text: text,
            category: category
        };

        notes.push(newNote);

        noteInput.value = "";

        renderNotes();
    });

    function renderNotes(filterText = "") {
        notesList.innerHTML = "";

        const filteredNotes = notes.filter(note => 
            note.text.toLowerCase().includes(filterText.toLowerCase())
        );

        filteredNotes.forEach(note => {
            const li = document.createElement("li");

            li.classList.add(`category-${note.category.toLowerCase()}`);

            li.innerHTML = `
                **[${note.category}]** ${note.text}
            `;

            notesList.appendChild(li);
        });

        noteCount.textContent = `Total notes: ${filteredNotes.length}`;
    }

    searchBox.addEventListener("input", (e) => {
        renderNotes(e.target.value);
    });
});
