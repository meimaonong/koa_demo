<template>
<div id="order">
    
    <div class="main_c">
        
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-select v-model="value" @change="selectChange" placeholder="请选择订单状态">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        </el-form>

        <el-pagination 
        v-show="list && pages"
        background
        layout="total, prev, pager, next"
        @current-change="pageChange"
        :current-page.sync="current_page"
        :page-count="pages"
        >
        </el-pagination>

        <el-table
            :data="list"
            stripe
            border
            style="width: 100%">
            <el-table-column
            label="订单号/下单时间"
            width="220">
            <template slot-scope="scope">
                <div>{{scope.row.order_no}}</div>
                <div style="color:#999">{{scope.row.created_time}}</div>
            </template>
            </el-table-column>
            <el-table-column
            label="订单内容"
            width="300">
            <template slot-scope="scope">
                <template v-for="item in scope.row.orderItems">
                    <div>
                        {{item.book.book_title}}&nbsp;&nbsp;
                        <span style="color:#ff4646;">{{item.book.book_price}}x{{item.book_num}}={{(Number(item.book.book_price) * Number(item.book_num)).toFixed(2)}}</span>
                        </div>
                </template>
            </template>
            </el-table-column>
            <el-table-column
            label="配送地址"
            width="300">
            <template slot-scope="scope">
            {{scope.row.receiver}}&nbsp;&nbsp;{{scope.row.receiver_tel}}&nbsp;&nbsp;{{scope.row.address_detail}}        
            </template>
            </el-table-column>
            <el-table-column
            label="订单总价">
            <template slot-scope="scope">
                <span style="color:#ff4646;">¥{{getTotal(scope.row.orderItems)}}</span>
            </template>
            </el-table-column>
            <el-table-column
            width="170"
            label="快递信息">
            <template slot-scope="scope">
            {{scope.row.express ? scope.row.express : '-'}}
            </template>
            </el-table-column>
            <el-table-column
            label="状态">
            <template slot-scope="scope">
                <template v-if="scope.row.order_status==0"><span style="color:#ff4646;">已完成</span></template>
                <template v-if="scope.row.order_status==1"><span style="color:#ff4646;">待付款</span></template>
                <template v-if="scope.row.order_status==2"><span style="color:#ff4646;">待发货</span></template>
                <template v-if="scope.row.order_status==3"><span style="color:#ff4646;">待收货</span></template>
            </template>
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
                <template v-if="scope.row.order_status==0">-</template>
                <template v-if="scope.row.order_status==1">-</template>

                <template v-if="scope.row.order_status==2">
                <el-popover
                    placement="top"
                    :value="sel_id == scope.row.order_id ? true : false"
                    title="快递信息"
                    width="350"
                    trigger="click"
                >
                    <el-input v-model="express" placeholder="顺丰：2888866666" style="margin-bottom:10px;"></el-input>
                    <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="cancel(scope.$index, scope.row)">取消</el-button>
                    <el-button type="primary" size="mini" @click="confirm(scope.$index, scope.row)">确定</el-button>
                    </div>
                    <el-button
                    size="mini"
                    type="primary"
                    plain
                    slot="reference"
                    @click="back(scope.$index, scope.row)">发货</el-button>
                </el-popover>
                </template>

                <!--{<template v-if="scope.row.order_status==2"><el-button type="primary">发货</el-button></template> }-->
                <!--{<template v-if="scope.row.order_status==3"><el-button type="primary" size="mini" plain>已收货</el-button></template>}-->

                <template v-if="scope.row.order_status==3">
                <el-popover
                    placement="top"
                    :value="sel_receive_id == scope.row.order_id? true : false"
                    title="收货状态"
                    width="350"
                    trigger="click"
                >
                    <p>确定该订单已收货?</p>
                    <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="receive_cancel(scope.$index, scope.row)">取消</el-button>
                    <el-button type="primary" size="mini" @click="receive_confirm(scope.$index, scope.row)">确定</el-button>
                    </div>
                    <el-button
                    size="mini"
                    type="primary"
                    plain
                    slot="reference"
                    @click="receive(scope.$index, scope.row)">完成收货</el-button>
                </el-popover>
                </template>

            </template>
            </el-table-column>
        </el-table>

        <el-pagination 
        v-show="list && pages"
        background
        layout="total, prev, pager, next"
        :current-page.sync="current_page"
        :page-count="pages"
        >
        </el-pagination>

        
    </div>

</div>
</template>
<script src="./order.js"></script>
