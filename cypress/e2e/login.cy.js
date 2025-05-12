describe("User Login Flow", () => {
    it("should log in and redirect to dashboard", () => {
        cy.visit("http://localhost:5173");
    
        cy.get('input[id="state_filter"]').click();
        cy.contains('.ant-select-item-option-content', 'Bizerte').click();

        cy.get("button.submit_search").click();
    });
});