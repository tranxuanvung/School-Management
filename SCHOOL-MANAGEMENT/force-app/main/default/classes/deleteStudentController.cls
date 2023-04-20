public with sharing class deleteStudentController {
    @AuraEnabled
    public static Boolean deleteStudent(Id studentId){
        if(studentId != null){
            HocSinh__c st = [select Id, Name from HocSinh__c where Id = :studentId];
            try {
                delete st;
                return true;
            } catch (DmlException e) {
                System.debug('Đã xảy ra lỗi: ' + e.getMessage());
                return false;
            }
        }
        return false;
    }

    @AuraEnabled
    public static Boolean deleteStudents(List<Id> students){
        List<HocSinh__c> listStudents = [Select Id, Name from HocSinh__c where Id in :students];
        if(listStudents != null){
            try {
                delete listStudents;
                return true;
            } catch (DmlException e) {
                System.debug('Đã xảy ra lỗi: ' + e.getMessage());
                return false;
            }
        }
        return false;
    }
}