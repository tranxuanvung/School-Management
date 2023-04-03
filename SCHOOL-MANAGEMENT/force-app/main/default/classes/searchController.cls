public with sharing class searchController {
    @AuraEnabled(cacheable=true)
    public static List<HocSinh__c> getSearchResult(String studentName, Date startDate, Date endDate, String sortResult){
        List<HocSinh__c> listHS = new List<HocSinh__c>();
        
        // Kết quả có xắp xếp
        if(sortResult == 'true'){
            if(studentName != ''){
                listHS = [select ID, HoHocSinh__c, Name, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Name = :studentName and ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) order by Name];
            }else {
                listHS = [select ID, HoHocSinh__c, Name, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) order by Name];
            }
        // Kết quả không xắp xếp
        }else{
            if(studentName != ''){
                listHS = [select ID, HoHocSinh__c, Name, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Name = :studentName and ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate))];
            }else {
                listHS = [select ID, HoHocSinh__c, Name, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate))];
            }
        }

        
        if(listHS != null){
            return listHS;
        }
        return null;
    }
}