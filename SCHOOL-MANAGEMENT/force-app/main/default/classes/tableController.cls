public with sharing class tableController {
    @AuraEnabled()
    public static List<HocSinh__c> getHocSinh(){
        List<HocSinh__c> listHS = [select ID, HoHocSinh__c, Name, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c];
        if(listHS != null){
            return listHS;
        }
        return null;
    }
}