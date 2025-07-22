// force-app/main/default/apex/CustomerController.cls
public with sharing class CustomerController {
    /**
     * @description Searches for accounts by name.
     * @param keyword The string to search for in account names.
     * @return A list of matching Accounts.
     */
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String keyword) {
        String searchKey = '%' + String.escapeSingleQuotes(keyword) + '%';
        return [
            SELECT Id, Name, Industry
            FROM Account
            WHERE Name LIKE :searchKey
            ORDER BY Name
            LIMIT 10
        ];
    }

    /**
     * @description Retrieves all contacts for a given account ID.
     * @param accountId The ID of the Account.
     * @return A list of related Contacts.
     */
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByAccount(Id accountId) {
        return [
            SELECT Id, Name, Email, Phone, Title
            FROM Contact
            WHERE AccountId = :accountId
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    /**
     * @description Retrieves all opportunities for a given account ID.
     * @param accountId The ID of the Account.
     * @return A list of related Opportunities.
     */
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunitiesByAccount(Id accountId) {
        return [
            SELECT Id, Name, StageName, Amount, CloseDate, AccountId
            FROM Opportunity
            WHERE AccountId = :accountId
            WITH SECURITY_ENFORCED
            ORDER BY CloseDate DESC
        ];
    }

    /**
     * @description Retrieves all cases for a given account ID.
     * @param accountId The ID of the Account.
     * @return A list of related Cases.
     */
    @AuraEnabled(cacheable=true)
    public static List<Case> getCasesByAccount(Id accountId) {
        return [
            SELECT Id, CaseNumber, Subject, Status, CreatedDate
            FROM Case
            WHERE AccountId = :accountId
            WITH SECURITY_ENFORCED
            ORDER BY CreatedDate DESC
        ];
    }

    /**
     * @description Deletes a contact record by its ID.
     * @param contactId The ID of the Contact to delete.
     */
    @AuraEnabled
    public static void deleteContact(Id contactId) {
        try {
            Contact contactToDelete = new Contact(Id = contactId);
            delete contactToDelete;
        } catch (DmlException e) {
            // AuraHandledException is a clean way to pass server-side exceptions to LWC
            throw new AuraHandledException('Error deleting contact: ' + e.getMessage());
        }
    }
}