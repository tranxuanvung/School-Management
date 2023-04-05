public with sharing class getStudentByIdController {
    @AuraEnabled
    public static HocSinh__c getStudent(Id studentId){
        HocSinh__c st = [select Id, HoHocSinh__c, Name, GioiTinh__c, NgaySinh__c, Lop__c, Lop__r.Name, (select Id, Name, Diem_15_1__c, Diem_15_2__c,Diem_1_Tiet__c, DiemTBM__c from Mon__r) from HocSinh__c where Id = :studentId];
        if(st != null){
            System.debug(st);
            return st;
        }
        return null;
    }
}