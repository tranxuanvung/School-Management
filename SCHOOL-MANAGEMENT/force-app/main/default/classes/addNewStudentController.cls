public with sharing class addNewStudentController {
    @AuraEnabled()
    public static Id addNewStudent(String firstName, String lastName, Boolean gender, Date birthday, Id classId){
        HocSinh__c student = new HocSinh__c();
        student.Name = firstName;
        student.HoHocSinh__c = lastName;
        student.GioiTinh__c = gender;
        student.NgaySinh__c = birthday;
        student.Lop__c = classId;

        try {
            insert student;
            return student.Id;
        } catch (Dmlexception e) {
            System.debug('Một lỗi đã xuất hiện: ' + e.getMessage());
            return null;
        }
    }
}