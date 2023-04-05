public with sharing class updateStudentController {
    @AuraEnabled
    public static Boolean updateStudent(Id studentId, String firstname, String lastname, Boolean gender, Date birthday){
        HocSinh__c hs = [select Id, HoHocSinh__c, Name, GioiTinh__c, NgaySinh__c from HocSinh__c where Id = :studentId];

        if(hs != null){
            hs.HoHocSinh__c = lastname;
            hs.Name = firstname;
            hs.GioiTinh__c = gender;
            hs.NgaySinh__c = birthday;
        }
        try {
            System.debug(hs);
            update hs;
            return true;
        } catch (Dmlexception e) {
            System.debug('Một lỗi đã xuất hiện: ' + e.getMessage());
            return false;
        }
    }
}