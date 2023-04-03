import { LightningElement, wire } from 'lwc';
import getHocSinh from '@salesforce/apex/tableController.getHocSinh';
const COLUMNS = [
    {label:'Họ', fieldName:'HoHocSinh__c', type:'text'},
    {label:'Tên', fieldName:'Name', type:'text'},
    {label:'Lớp', fieldName:'Lop__r', type:'text'},
    {label:'Ngày Sinh', fieldName:'NgaySinh__c', type:'date'},
    {label:'Giới Tính', fieldName:'HGioiTinh__c', type:'Checkbox'},
    {label:'Điểm TB tổng', fieldName:'DiemTBTong__c', type:'number'},
    {label:'Tình trạng', fieldName:'TinhTrang__c', type:'text'},
    {label:'', fieldName:''}
];
export default class VF_TimKiem extends LightningElement {
    tableData
    columns = COLUMNS
    @wire(getHocSinh)
    hocsinhHandler({data, error}){
        if(data){
            console.log(data);
            this.tableData = data;
        }else{
            console.error(error);
        }
    }
}