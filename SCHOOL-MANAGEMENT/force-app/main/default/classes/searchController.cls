public with sharing class searchController {
    @AuraEnabled(cacheable=true)
    public static List<HocSinh__c> getSearchResult(String studentName, Date startDate, Date endDate, String sortResult, Id classId){
        List<HocSinh__c> listHS = new List<HocSinh__c>();
        studentName = '%' + studentName + '%';
        // Kết quả có xắp xếp
        // if(sortResult == 'true'){
        //     if(studentName != ''){
        //         if(classId != null){
        //             listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Name like :studentName and ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) and Lop__c = :classId order by Name];
        //         }else{
        //             listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Name like :studentName and ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) order by Name];
        //         }
        //     }else {
        //         if(classId != null){
        //             if(startDate == null && endDate == null){
        //                 listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Lop__c = :classId order by Name];
        //             }else{
        //                 listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) and Lop__c = :classId order by Name];
        //             }
        //         }else{
        //             listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) order by Name];
        //         }
        //     }
        // // Kết quả không xắp xếp
        // }else{
        //     if(studentName != ''){
        //         if(classId != null){
        //             listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Name like :studentName and ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) and Lop__c = :classId];
        //         }else{
        //             listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Name like :studentName and ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate))];
        //         }
        //     }else {
        //         if(classId != null){
        //             if(startDate == null && endDate == null){
        //                 listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Lop__c = :classId];
        //             }else{
        //                 listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) and Lop__c = :classId];
        //             }
        //         }else{
        //             listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate))];
        //         }
        //     }
        // }
        if(endDate == null){
            endDate = date.today();
            System.debug(endDate);
        }
        if(startDate == null){
            startdate = date.newInstance(1900, 1, 1);
            System.debug(endDate);
        }

        if(sortResult == 'true'){
            if(studentName != null){
                if(classId != null){
                    listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Name like :studentName and ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) and Lop__c = :classId order by Name];
                }else{
                    listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Name like :studentName and ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) order by Name];
                }
            }else{
                if(classId != null){
                    listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) and Lop__c = :classId order by Name];
                }else{
                    listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) order by Name];
                }
            }
        }else{
            if(studentName != null){
                if(classId != null){
                    listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Name like :studentName and ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) and Lop__c = :classId];
                }else{
                    listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where Name like :studentName and ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate))];
                }
            }else{
                if(classId != null){
                    listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate)) and Lop__c = :classId];
                }else{
                    listHS = [select ID, HoHocSinh__c, Name, Lop__c, Lop__r.Name, NgaySinh__c, GioiTinh__c, TinhTrang__c, DiemTBTong__c, (select Name, DiemTBM__c from Mon__r) from HocSinh__c where ((NgaySinh__c >= :startDate) and (NgaySinh__c <= :endDate))];
                }
            }
        }

        if(listHS != null){
            return listHS;
        }
        return null;
    }
}