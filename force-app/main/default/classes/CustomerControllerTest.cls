// force-app/main/default/apex/CustomerControllerTest.cls
@isTest
public with sharing class CustomerControllerTest {

    // Use @testSetup to create common test data once for all test methods
    @TestSetup
    static void makeData(){
        // Create a test Account
        Account acc = new Account(Name='Test Corp', Industry='Technology');
        insert acc;

        // Create related records
        List<Contact> contacts = new List<Contact>();
        contacts.add(new Contact(LastName='Smith', AccountId=acc.Id, Email='smith@testcorp.com'));
        contacts.add(new Contact(LastName='Jones', AccountId=acc.Id, Email='jones@testcorp.com'));
        insert contacts;

        List<Opportunity> opps = new List<Opportunity>();
        opps.add(new Opportunity(Name='Test Opp 1', AccountId=acc.Id, StageName='Prospecting', CloseDate=Date.today().addDays(30)));
        insert opps;

        List<Case> cases = new List<Case>();
        cases.add(new Case(Subject='Test Case 1', AccountId=acc.Id, Status='New'));
        insert cases;
    }

    @isTest
    static void testSearchAccounts() {
        Test.startTest();
        List<Account> results = CustomerController.searchAccounts('Test');
        Test.stopTest();

        System.assertEquals(1, results.size(), 'Should find one account matching "Test"');
        System.assertEquals('Test Corp', results[0].Name);
    }

    @isTest
    static void testGetContactsByAccount() {
        Account acc = [SELECT Id FROM Account WHERE Name='Test Corp' LIMIT 1];

        Test.startTest();
        List<Contact> results = CustomerController.getContactsByAccount(acc.Id);
        Test.stopTest();

        System.assertEquals(2, results.size(), 'Should retrieve the 2 contacts for the account');
    }

    @isTest
    static void testGetOpportunitiesByAccount() {
        Account acc = [SELECT Id FROM Account WHERE Name='Test Corp' LIMIT 1];

        Test.startTest();
        List<Opportunity> results = CustomerController.getOpportunitiesByAccount(acc.Id);
        Test.stopTest();

        System.assertEquals(1, results.size(), 'Should retrieve the 1 opportunity for the account');
    }

    @isTest
    static void testGetCasesByAccount() {
        Account acc = [SELECT Id FROM Account WHERE Name='Test Corp' LIMIT 1];

        Test.startTest();
        List<Case> results = CustomerController.getCasesByAccount(acc.Id);
        Test.stopTest();

        System.assertEquals(1, results.size(), 'Should retrieve the 1 case for the account');
    }

    @isTest
    static void testDeleteContact() {
        Contact contactToDelete = [SELECT Id FROM Contact WHERE LastName='Smith' LIMIT 1];

        Test.startTest();
        CustomerController.deleteContact(contactToDelete.Id);
        Test.stopTest();

        // Verify the contact was deleted
        List<Contact> verifyList = [SELECT Id FROM Contact WHERE Id = :contactToDelete.Id];
        System.assertEquals(0, verifyList.size(), 'The contact should have been deleted');
    }

    @isTest
    static void testDeleteContactError() {
        // Create a contact that cannot be deleted due to a fictitious trigger/validation
        // For this test, we can just pass an invalid ID to test the try-catch block
        Id fakeId = '003000000000000AAA';
        String errorMessage = '';

        Test.startTest();
        try {
            CustomerController.deleteContact(fakeId);
        } catch (AuraHandledException e) {
            errorMessage = e.getMessage();
        }
        Test.stopTest();

        // Assert that the expected error message was thrown
        System.assert(errorMessage.contains('Error deleting contact'), 'Should have caught the DML exception');
    }
}