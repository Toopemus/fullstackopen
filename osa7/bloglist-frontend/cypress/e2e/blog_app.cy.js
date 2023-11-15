describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Teuvo Testaaja",
      username: "teuvo63",
      password: "salasana"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    const user2 = {
      name: "Joku Toinen",
      username: "joku_toinen",
      password: "salasana"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user2)
    cy.visit("http://localhost:5173")
  })

  it("Login form is shown", function () {
    cy.visit("http://localhost:5173")
    cy.contains("log in to bloglist")
    cy.contains("username")
    cy.contains("password")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("teuvo63")
      cy.get("#password").type("salasana")
      cy.contains("login").click()

      cy.get("html")
        .should("contain", "Teuvo Testaaja logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("teuvo63")
      cy.get("#password").type("v1rhe")
      cy.contains("login").click()

      cy.get("html")
        .should("not.contain", "Teuvo Testaaja logged in")
        .and("contain", "invalid username or password")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("teuvo63")
      cy.get("#password").type("salasana")
      cy.contains("login").click()
    })

    it("A blog can be created", function () {
      cy.contains("new blog").click()
      cy.get("#title").type("Teuvon blogi")
      cy.get("#author").type("Teuvo")
      cy.get("#url").type("teuvon-blogi.com")
      cy.get("button").contains("create").click()

      cy.get("html")
        .should("contain", "Teuvon blogi by Teuvo")
    })

    describe("When a blog has been added", function () {
      beforeEach(function () {
        cy.contains("new blog").click()
        cy.get("#title").type("Teuvon blogi")
        cy.get("#author").type("Teuvo")
        cy.get("#url").type("teuvon-blogi.com")
        cy.get("button").contains("create").click()
      })
      it("A blog can be liked", function () {
        cy.contains("show").click()
        cy.contains("likes 0")
        cy.get("button").contains("like").click()
        cy.get("html")
          .should("contain", "likes 1")
      })
      it("User can remove an added blog", function () {
        cy.contains("show").click()
        cy.contains("remove").click()
        cy.get("html")
          .should("not.contain", "Teuvon blogi by Teuvo")
      })
      it("A blog can't be removed by another user", function () {
        cy.contains("show").click()
        cy.contains("remove") // Original user can remove

        cy.contains("logout").click()
        cy.visit("http://localhost:5173")
        cy.get("#username").type("joku_toinen")
        cy.get("#password").type("salasana")
        cy.contains("login").click()

        cy.contains("show").click()
        cy.get("button")
          .should("not.contain", "remove") // Other user can't remove
      })
    })

    describe("When multiple blogs have been added", function () {
      beforeEach(function () {
        cy.get("button").contains("new blog").click()
        cy.get("#title").type("Vähiten tykkäyksiä")
        cy.get("#author").type("testaaja")
        cy.get("#url").type("blogi1.com")
        cy.get("button").contains("create").click()

        cy.get("button").contains("new blog").click()
        cy.get("#title").type("Toiseksi eniten tykkäyksiä")
        cy.get("#author").type("testaaja")
        cy.get("#url").type("blogi2.com")
        cy.get("button").contains("create").click()

        cy.get("button").contains("new blog").click()
        cy.get("#title").type("Eniten tykkäyksiä")
        cy.get("#author").type("testaaja")
        cy.get("#url").type("blogi3.com")
        cy.get("button").contains("create").click()
      })
      it("Blogs will get sorted by likes", function () {
        // initial order, dependant on the order submitted
        cy.get(".blog").eq(0).contains("Vähiten tykkäyksiä by testaaja")
        cy.get(".blog").eq(1).contains("Toiseksi eniten tykkäyksiä by testaaja")
        cy.get(".blog").eq(2).contains("Eniten tykkäyksiä by testaaja")

        cy.get(".blog").eq(2).contains("show").click()
        cy.get("button").contains("like").click().click()
        cy.contains("hide").click()

        cy.get(".blog").eq(2).contains("show").click()
        cy.get("button").contains("like").click()
        cy.contains("hide").click()

        // Should be ordered by likes
        cy.get(".blog").eq(0).contains("Eniten tykkäyksiä by testaaja")
        cy.get(".blog").eq(1).contains("Toiseksi eniten tykkäyksiä by testaaja")
        cy.get(".blog").eq(2).contains("Vähiten tykkäyksiä by testaaja")
      })
    })
  })
})