public with sharing class tableController {
    @AuraEnabled(cacheable=true)
    public static List<HocSinh__c> getHocSinh(){
        return [select ID, HoHocSinh__c, Name, Lop__r.Name, NgaySinh__c, 	GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c];
    }
}