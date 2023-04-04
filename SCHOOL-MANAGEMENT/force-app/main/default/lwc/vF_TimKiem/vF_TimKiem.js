import { LightningElement, track } from 'lwc';
import LightningAlert from 'lightning/alert';
import {NavigationMixin} from 'lightning/navigation';
import {refreshApex} from '@salesforce/apex';
import getHocSinh from '@salesforce/apex/tableController.getHocSinh';
import getSearchResult from '@salesforce/apex/searchController.getSearchResult';
import getClassData from '@salesforce/apex/getClassDataController.getClassData';

const actions = [
    { label: 'Cập nhật', name: 'update' },
    { label: 'xóa', name: 'delete' },
];
const COLUMNS = [
    {label:'Họ', fieldName:'HoHocSinh__c', type:'text'},
    {label:'Tên', fieldName:'Name', type:'text'},
    {label:'Lớp', fieldName:'TenLop', type:'text'},
    {label:'Ngày Sinh', fieldName:'NgaySinh__c', type:'text'},
    {label:'Giới Tính', fieldName:'GioiTinh', type:'text'},
    {label:'Điểm TB tổng', fieldName:'DiemTBTong__c', type:'number'},
    {label:'Tình trạng', fieldName:'TinhTrang__c', type:'text'},
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];


export default class VF_TimKiem extends NavigationMixin(LightningElement) {
    tableData
    tableSize
    classData
    columns = COLUMNS
    @track dataSearch = {studentName: "", startDate: null, endDate: null, sortResult: "", classId: null};

    connectedCallback(){
        getHocSinh().then(res => {
            this.tableData = this.convertData(res);
            this.tableSize = res.length;
            console.log(res);
        }).catch(error => {
            console.log(error);
        });

        getClassData().then(res => {
            this.classData = res;
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }

    handleChange(event){
        const field = event.target.name;
        if(field === 'studentName'){
            this.dataSearch.studentName = event.target.value;
        }
        if(field === 'startDate'){
            this.dataSearch.startDate = event.target.value;
        }
        if(field === 'endDate'){
            this.dataSearch.endDate = event.target.value;
        }
        if(field === 'sortResult'){
            this.dataSearch.sortResult = event.target.checked;
        }
        if(field === 'classId'){
            this.dataSearch.classId = event.target.value;
        }
    }

    handleSearch(event){
        let tempData = [];
        const searchData = JSON.parse(JSON.stringify(this.dataSearch));
        // Hiển thị alert cho những trường hợp sau
        // 1. Chưa nhập bất kỳ trường nào
        // 2. Tên rỗng nhưng một trong 2 trường startDate và endDate khác rỗng
        // 3. Tên khác rỗng nhưng một trong 2 trường startDate và endDate khác rỗng
        if(searchData.studentName == '' && searchData.startDate == null && searchData.endDate == null && searchData.classId == null || searchData.studentName == '' && searchData.startDate != null && searchData.endDate == null || searchData.studentName == '' && searchData.startDate == null && searchData.endDate != null || searchData.studentName != '' && searchData.startDate != null && searchData.endDate == null || searchData.studentName != '' && searchData.startDate == null && searchData.endDate != null){
            LightningAlert.open({
                message: "Chưa nhập điều kiện tìm kiếm",
                theme: "error",
                label: "Thông báo lỗi"
            });
        }else{
            getSearchResult({studentName: searchData.studentName,startDate: searchData.startDate,endDate: searchData.endDate,sortResult: searchData.sortResult, classId: searchData.classId}).then(res => {
                console.log(res);
                if(res.length == 0){
                    LightningAlert.open({
                        message: "Không có thông tin học sinh nào thỏa mãn những điều kiện trên",
                        theme: "error",
                        label: "Thông báo kết quả"
                    });
                }
                if(res != null){
                    this.tableData = this.convertData(res);
                    this.tableSize = this.tableData.length;
                    return refreshApex(this.tableData);
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    handleAdd(event){
        window.location.href = '/lightning/n/Add_Student';
    }

    // convert data trả về
    convertData(res){
        let tempData = JSON.parse(JSON.stringify(res));
        tempData = tempData.map(row => {
            // convert giới tính
            let gioiTinh;
            if(row.GioiTinh__c == true){
                gioiTinh = 'Nam';
            }else{
                gioiTinh = 'Nữ';
            }

            // convert ngày sinh
            const temp = row.NgaySinh__c.toString();
            const year = temp.substring(0,4);
            const month = temp.substring(5,7);
            const day = temp.substring(8);
            let date = day + '/' + month + '/' + year;
            row.NgaySinh__c = date;

            return{...row, TenLop: row.Lop__r.Name, GioiTinh: gioiTinh};
        })
        return tempData;
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                // this.deleteRow(row);
                break;
            case 'update':
                // this.showRowDetails(row);
                break;
            default:
        }
    }
}