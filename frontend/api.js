function addMentor() {

    let name =
        document.getElementById("name").value;

    let department =
        document.getElementById("department").value;

    let email =
        document.getElementById("email").value;

    if (name === "" ||
        department === "" ||
        email === "") {

        alert("Please fill all fields");

        return;
    }

    fetch("http://localhost:8080/mentors", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            department: department,
            email: email
        })

    })

    .then(response => response.json())

    .then(data => {

        alert("Mentor added successfully");

        document.getElementById("name").value = "";
        document.getElementById("department").value = "";
        document.getElementById("email").value = "";

    })

    .catch(error => {

        alert("Error adding mentor");

    });

}

function addMentee() {

    let name =
        document.getElementById("name").value;

    let rollNumber =
        document.getElementById("rollNumber").value;

    let year =
        document.getElementById("year").value;

    if (name === "" ||
        rollNumber === "" ||
        year === "") {

        alert("Please fill all fields");

        return;
    }

    fetch("http://localhost:8080/mentees", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            rollNumber: rollNumber,
            year: year
        })

    })

    .then(response => response.json())

    .then(data => {

        alert("Mentee added successfully");

        document.getElementById("name").value = "";
        document.getElementById("rollNumber").value = "";
        document.getElementById("year").value = "";

    })

    .catch(error => {

        alert("Error adding mentee");

    });

}

function loadMentors() {

    fetch("http://localhost:8080/mentors")

    .then(response => response.json())

    .then(data => {

        let dropdown =
            document.getElementById("mentor");

        data.forEach(m => {

            let option =
                document.createElement("option");

            option.value = m.mentorId;

            option.text =
                m.name;

            dropdown.appendChild(option);

        });

    });

}

function loadMentees() {

    fetch("http://localhost:8080/mentees")

    .then(response => response.json())

    .then(data => {

        let dropdown =
            document.getElementById("mentee");

        data.forEach(m => {

            let option =
                document.createElement("option");

            option.value = m.menteeId;

            option.text =
                m.name;

            dropdown.appendChild(option);

        });

    });

}

function assignMentor() {

    let mentorId =
        document.getElementById("mentor").value;

    let menteeId =
        document.getElementById("mentee").value;

    let date =
        document.getElementById("date").value;

    let done =
        document.getElementById("done").checked;

    if (mentorId === "Select Mentor" ||
        menteeId === "Select Mentee" ||
        date === "") {

        alert("Please select all fields");

        return;
    }

    fetch("http://localhost:8080/assignments", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            mentorId: mentorId,
            menteeId: menteeId,
            lastMeetingDate: date,
            meetingDone: done
        })

    })

    .then(response => response.json())

    .then(data => {

        alert("Assignment created successfully");

    })

    .catch(error => {

        alert("Error creating assignment");

    });

}

function loadAssignments() {

    fetch("http://localhost:8080/assignments")

    .then(response => response.json())

    .then(data => {

        let table =
            document.getElementById("tableBody");

        table.innerHTML = "";

        data.forEach(a => {

            let row =
                "<tr>" +

                "<td>" + a.assignmentId + "</td>" +

                "<td>" + a.mentorId + "</td>" +

                "<td>" + a.menteeId + "</td>" +

                "<td>" + a.lastMeetingDate + "</td>" +

                "<td>" +
                (a.meetingDone
                    ? "Completed"
                    : "Pending") +
                "</td>" +

                "</tr>";

            table.innerHTML += row;

        });

    });

}

function loadDashboard() {

    fetch("http://localhost:8080/dashboard")

    .then(response => response.json())

    .then(data => {

        document.getElementById("mentors")
            .innerText =
            data.totalMentors;

        document.getElementById("mentees")
            .innerText =
            data.totalMentees;

        document.getElementById("assignments")
            .innerText =
            data.totalAssignments;

        document.getElementById("done")
            .innerText =
            data.meetingsDone;

        document.getElementById("pending")
            .innerText =
            data.meetingsPending;

    });

}