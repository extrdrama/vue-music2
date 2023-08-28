<template>
    <div>
        <el-button color="red" size="" style="float: right;" @click="submit()">提交</el-button>
        <h2>{{ title }}</h2>

        <el-table :data="cart" show-summary :summary-method="getSummaries" border style="width:90%;margin:50px auto;">
            <!-- 复选框 -->
            <el-table-column label="图片" width="">
                <!-- 绑定表格数据行对应的active字段 -->
                <!-- <template v-slot="scope">
                    <el-checkbox v-model="scope.row.active"></el-checkbox>
                </template> -->
                <template v-slot="scope">
                    <img :src="scope.row.cover" width="100" height="100" />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="书名" fit="true"></el-table-column>
            <el-table-column prop="author" label="作者" fit="true"></el-table-column>
            <el-table-column prop="price" label="单价" width="100">
                <!-- 绑定表格数据行对应的price字段 -->
                <template v-slot="prices">
                    <span style="font-weight: 700;">￥{{ prices.row.price }}</span>
                </template>
            </el-table-column>
            <el-table-column label="数量" width="200">
                <!-- 绑定表格数据行对应的count字段 -->
                <template v-slot="scope">
                    <el-input-number v-model="scope.row.count" :min="1"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="金额" width="150">
                <template v-slot="scope">
                    <span style="color: red; font-weight: 700;">￥{{ scope.row.price * scope.row.count }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template v-slot="scope">
                    <el-button size="mini" type="danger" @click="remove(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'MyCart', //组件名
    data() {
        return {
            title: "购物车",
            cart: []
        };

    }, //end data

    props: {
        cart1: {},
    },
    created() {
        // axios.get('api/cart/list')
        //     .then(res => {
        //         console.log(res.data);
        //         this.cart = res.data;
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
        this.cart = this.cart1;
        console.log(this.cart);
    },

    
    emits: ['delete'],
    methods: {
        sub(i) {
            let count = this.cart[i].count;
            count > 1 ? this.cart[i].count-- : this.remove(i);
        },

        submit() {
            if (window.confirm('确定要提交吗')) {
                console.log(JSON.stringify(this.cart));
                axios.post('api/cart/submit/', JSON.stringify(this.cart), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        remove(i) {
            if (window.confirm('确定要删除吗')) {
                this.$emit('delete', this.cart[i].id);
                this.cart.splice(i, 1) //删除当前行，第二个参数为长度
                console.log(i);
                
            }
        },
        add(i) {
            this.cart[i].count++;
        },
        getSummaries(param) {
            const { columns } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index == 3) {
                    sums[index] = '总件数：' + this.totalCount;
                    return;
                }
                if (index == 4) {
                    sums[index] = '总金额：￥' + this.totalPrice;
                    return;
                }
            });
            return sums;
        },
    }, //end methods
    computed: {
        count() {
            return this.cart.length
        },
        activeCount() {
            return this.cart.filter(v => v.active).length
        },
        totalPrice() {
            let sum = 0;
            this.cart.forEach(c => {
                if (c.active) {
                    sum += c.price * c.count
                }
            });
            return sum
        },
        totalCount() {
            let sum = 0;
            this.cart.forEach(c => {
                sum += c.count
            });
            return sum;
        },
    }, //end computed



}; //export
</script>
<style scoped
> .tbl {
     border-collapse: collapse;
     width: 650px;
     height: 150px;
     text-align: center;
     margin: 20px auto;
 }

 .tbl th,
 .tbl td {
     border: 1px solid #aaa;
 }
</style>