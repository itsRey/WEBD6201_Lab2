
class User {

    // Constructor
    constructor(firstName, lastName, emailAddress, password) {
        this.FirstName = firstName
        this.LastName = lastName
        this.EmailAddress = emailAddress
        this.Password = password
    }

    // Getters and Setters
    get FirstName() {
        return this.m_firstName
    }
    set FirstName(firstName) {
        this.m_firstName = firstName
    }

    get LastName() {
        return this.m_lastName
    }
    set LastName(lastName) {
        this.m_lastName = lastName
    }

    get EmailAddress() {
        return this.m_emailAddress
    }
    set EmailAddress(emailAddress) {
        this.m_emailAddress = emailAddress
    }

    get Password(){
        return this.m_password
    }

    set Password(password){
        this.m_password = password
    }

    // Public Utility Method

    // Serialize Method
    serialize() {
        if (this.FirstName !== "" && this.LastName !== "" && this.EmailAddress !== "" && this.Password !== "")
            return `${this.FirstName}, ${this.LastName}, ${this.EmailAddress}, ${this.Password}`
        console.error("One or more properties or fields of the User Object are missing or invalid!")
        return null
    }

    // Deserialize Method
    deserialize(data) {
        let propertyArray = data.split(",")
        this.FirstName = propertyArray[0]
        this.LastName = propertyArray[1]
        this.EmailAddress = propertyArray[2]
        this.Password = propertyArray[3]
    }

    // Public Override Method
    toString() {
        return `Full Name is: ${this.FirstName}\nLast Name is: ${this.LastName}\nEmail Address is: ${this.EmailAddress}\nPassword is: ${this.Password}`
    }
}

