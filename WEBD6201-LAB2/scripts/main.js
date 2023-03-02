(function () {

    function DisplayNavBar() {
        // AJAX
        // Instantiate the XHR Object
        let XHR = new XMLHttpRequest()

        // Add event listener for the readystatechange
        XHR.addEventListener("readystatechange", () => {
            if (XHR.readyState === 4 && XHR.status === 200) {
                $('#navigationBar').html(XHR.responseText)
            }
        })

        // Connect and get data
        XHR.open("GET", "../static/header.html")

        // Send request to server to await response
        XHR.send()
    }
    function DisplayHome() {
        $("#RandomButton").on("click", function () {
            location.href = 'contact.html'
        })

        // concatenation - '1' + '2' + '3'
        // interpolation - `${var_1}`
        let firstString = "This is a "
        let secondString = `${firstString} main paragraph that we added through javascript and this is also on GitHub Pages`

        $("main").addClass("container").append(`<p id="MainParagraph" class="mt-3 container">${secondString}</p>`)


    }

    function DisplayProjects() {
        console.log("Projects Page")
    }

    function register() {
        // Get the input values
        var firstName = document.getElementById("firstName").value;
        var password = document.getElementById("password").value;
        var email = document.getElementById("emailAddress").value;
        var lastName = document.getElementById("lastName").value;

        // Save the values to local storage
        let users = localStorage.getItem('users')

        const user = {
            firstName,
            password,
            email,
            lastName
        }
        if (!users) {
            users = [user]
            localStorage.setItem('users', JSON.stringify(users))
            const UserObj = new User(user.firstName, user.lastName, user.emailAddress, user.password);
            console.log(`${UserObj.toString()}`)
        } else {
            users = JSON.parse(users)
            let userExist = users.find((u) => u.email === user.email)
            if (userExist) {
                //DISPLAY AN ERROR 
                $('#messageArea').text('User Email already in use').addClass('alert alert-danger').show()
                console.log('register button ran')
                return
            } else {
                users.push(user)
                localStorage.setItem('users', JSON.stringify(users))
                const UserObj = new User(user.firstName, user.lastName, user.emailAddress, user.password);
                console.log(`${UserObj.toString()}`)
            }
        }
    }


    function login() {
        // Get the input values
        var username = document.getElementById("contactName").value;
        var password = document.getElementById("password").value;

        let users = localStorage.getItem('users')

        if (!users) {
            $("#messageArea").addClass('alert alert-danger').text("User Does Not Exist").show()
            return
        }

        users = JSON.parse(users)
        const user = users.find((u) => u.email === username)
        if (!user) {
            $("#messageArea").addClass('alert alert-danger').text("User Does Not Exist").show()
            return
        }

        if (user.password !== password) {
            $("#messageArea").addClass('alert alert-danger').text("Incorrect Password").show()
            return
        }

        $("#messageArea").removeAttr('class').hide()
        localStorage.setItem('login', JSON.stringify(user))
        console.log(user)

        SwitchBetweenLoginAndOut()
    }

    function SwitchBetweenLoginAndOut() {
        let loginUser = localStorage.getItem('login')
        if (!loginUser) {
            return
        }
        loginUser = JSON.parse(loginUser)

        const login = document.getElementById("loginButton")
        login.innerHTML = `<p class="nav-link btn btn-primary" href="#">Logout</p>`
        login.onclick = () => {
            logout()
            login.innerHTML = `<a class="nav-link btn btn-primary" href="../login.html">Login</a>`
        }

        const username = document.createElement('div');
        username.innerHTML = `${loginUser.email}`
        login.parentNode.insertBefore(username, login.previousSibling)
    }


    function logout() {
        localStorage.removeItem("login");

        window.location.href = "login.html";
    }

    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress)
        if (contact.serialize()) {
            let key = contact.Name.substring(0, 1) + Date.now()
            localStorage.setItem(key, contact.serialize())
        }
    }


    function ValidateInput(inputFieldID, regularExpression, exception) {
        let inputField = $('#' + inputFieldID);
        let messageArea = inputField.next('.message-area');
        if (messageArea.length === 0) {
            messageArea = $('<div/>').addClass('message-area').insertAfter(inputField);
        }

        inputField.on("blur", function () {
            let inputText = $(this).val();
            if (!regularExpression.test(inputText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(exception).show();
            } else {
                messageArea.removeClass("alert alert-danger").hide();
            }
        });
    }


    function ContactFormValidate() {
        let namePattern = /^([A-Z][a-z]{1,25})$/g;
        let emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-][^\d]{2,10}$/g;
        let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/g;

        ValidateInput("firstName", namePattern, "Please enter a valid first name which starts with a capitalized letter and has a maximum of 25 characters");
        ValidateInput("lastName", namePattern, "Please enter a valid last name which starts with a capitalized letter and has a maximum of 25 characters");
        ValidateInput("emailAddress", emailAddressPattern, "Please enter a valid email address");
        ValidateInput("password", passwordPattern, "Please enter a valid password which contains at least one uppercase letter, one lowercase letter, one digit, and is between 6 and 20 characters long");

        let password = $('#password').val();
        let confirmPasswordPattern = new RegExp(password, 'g');
        ValidateInput("confirmPassword", confirmPasswordPattern, "The confirmation password does not match the password");
    }


    function DisplayContacts() {
        console.log("Contact Us Page")

        ContactFormValidate()

        let submitButton = document.getElementById("submitButton")
        let subscribeCheckbox = document.getElementById("subscribeCheckbox")

        // localStorage Example
        // localStorage.setItem("Random Variable", "random variable for testing and demonstration")
        // console.log(localStorage.getItem("Random Variable"))
        // localStorage.removeItem("Random Variable")

        submitButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                // If user subscribes, store the contact in localStorage
                AddContact(fullName.value, contactNumber.value, emailAddress.value)
            }
        })
    }

    function DisplayContactList() {
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList") // Our contact list in the table of the contact-list page

            let data = "" // Add data to this variable. Append deserialized data from localStorage to data
            let keys = Object.keys(localStorage) // Return a String Array of keys

            let index = 1 // Count number of keys

            // for every key in the keys collection
            for (const key of keys) {
                let contactData = localStorage.getItem(key) // Get localStorage data value related to the key
                let contact = new core.Contact()

                contact.deserialize(contactData)

                // Inject repeatable row into the contactList
                data += `<tr>
                    <th scope="row" class="text-center">${index}</th>
                    <td class="text-center">${contact.Name}</td>
                    <td class="text-center">${contact.ContactNumber}</td>
                    <td class="text-center">${contact.EmailAddress}</td>
                    <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                    <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                </tr>
                `

                index++
            }

            contactList.innerHTML = data

            $("button.delete").on("click", function () {
                if (confirm("Are you sure you want to delete this?"))
                    localStorage.removeItem($(this).val())

                location.href = 'contact-list.html'
            })

            $("button.edit").on("click", function () {
                location.href = 'edit.html#' + $(this).val()
            })
        }

        $("#addButton").on("click", () => {
            location.href = 'edit.html#Add'
        })
    }

    function DisplayEditPage() {
        ContactFormValidate()
        let page = location.hash.substring(1)

        switch (page) {
            case "Add":
                {
                    $("#welcome").text("WEBD6201 Demo Add Contact")

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        // get form information (name, contact number, email address)
                        AddContact(fullName.value, contactNumber.value, emailAddress.value)

                        // redirect to contact-list
                        location.href = 'contact-list.html'
                    })
                }
                break
            default:
                {
                    // get contact info from localStorage
                    let contact = new core.Contact()
                    contact.deserialize(localStorage.getItem(page))

                    // display contact info in edit form
                    $("#fullName").val(contact.Name)
                    $("#contactNumber").val(contact.ContactNumber)
                    $("#emailAddress").val(contact.EmailAddress)

                    // when edit button is pressed, update the contact
                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        // get all changes from the form
                        contact.Name = $("#fullName").val()
                        contact.ContactNumber = $("#contactNumber").val()
                        contact.EmailAddress = $("#emailAddress").val()

                        // replace the changes in localStorage
                        localStorage.setItem(page, contact.serialize())

                        // go back to contact-list.html
                        location.href = 'contact-list.html'
                    })
                }
                break
        }
    }

    function DisplayReferences() {
        console.log("References Page")
    }

    function DisplayLoginPage() {
        console.log("References Page")
        $("#submitButton").on("click", function (e) {
            e.preventDefault();
            console.log("hello");
            login()

            return false
        })


    }
    function DisplayRegisterPage() {
        console.log("References Page")
        $("#submitButton").on("click", function (e) {
            e.preventDefault();
            console.log("tester");
            register()
            return false
        })
    }

    function Start() {
        console.log("App Started Successfully!")
        SwitchBetweenLoginAndOut()

        switch (document.title) {
            case "Home - WEBD6201 Demo":
                DisplayHome()
                DisplayNavBar()
                break
            case "Projects - WEBD6201 Demo":
                DisplayProjects()
                break
            case "Contact Us - WEBD6201 Demo":
                DisplayContacts()
                break
            case "Contact List - WEBD6201 Demo":
                DisplayContactList()
                break
            case "References - WEBD6201 Demo":
                DisplayReferences()
                break
            case "Edit - WEBD6201 Demo":
                DisplayEditPage()
                break
            case "Login - WEBD6201 Demo":
                DisplayLoginPage()
                break
            case "Register - WEBD6201 Demo":
                DisplayRegisterPage()
                ContactFormValidate()
                break

        }
    }

    window.addEventListener("load", Start)
})()