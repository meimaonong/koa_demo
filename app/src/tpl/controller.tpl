<?php

namespace app\controllers;

use Yii;

use app\common\controllers\BaseController;

class <%= htmlWebpackPlugin.options.title.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) %>Controller extends BaseController
{

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        $this->smarty->_smarty->display("<%= htmlWebpackPlugin.options.title %>/index.html");
    }

    
}
