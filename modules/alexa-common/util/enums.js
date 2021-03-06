'use strict'; 

// ======================================================================================================
// enums - enums
// 
// John R. Kosinski
//
// 22 Feb 2018
// ------------------------------------------------------------------------------------------------------
const configUtil = require('./configUtil'); 
const arrayUtil = require('./arrayUtil'); 

const _productFeautures = {
        finish:         ['finish','finishes'],
        colorTemp:      ['color temperature','color temperatures','color temps'],
        color:          ['color','colors'],
        height:         ['height','heights'],
        width:          ['width','widths'],
        depth:          ['depth','depths'],
        size:           ['size','sizes'],
        capacity:       ['capacity','capacities'],
        paintType:      ['paint type','paint types']        
    };

_productFeautures.normalizeFeatureName = (name) => {
    if (name) {
        name = name.trim().toLowerCase(); 
        for (var p in _productFeautures) {
            if (name === p.trim().toLowerCase())
                return p; 

            if (Array.isArray(_productFeautures[p])){
                for (var n=0; n<_productFeautures[p].length; n++) {
                    if (_productFeautures[p][n] === name)
                        return p; 
                }
            }
        }
    }
    return name; 
};

function allProductFeatureNames() {
    var output = []; 
    for(var p in _productFeautures) {
        output = arrayUtil.merge(output, _productFeautures[p]); 
    }
    
    return output; 
}

module.exports = {

    toArray: (en) => {
        var output = [];
        for (var p in en) {
            output.push(en[p]);
        }
        return output; 
    },

    // navigation commands for navigating response lists
    navigationCommand: configUtil.makeEnum([
        'next',
        'prev',
        'stop',
        'moveFirst'
    ]), 
    
    // subject of a query 
    querySubject: configUtil.makeEnum([
        'categories',
        'manufacturers',
        'products',
        'features'
    ]), 

    //data entity type 
    entityType: configUtil.makeEnum([
        'category',
        'manufacturer',
        'product'
    ]),
    
    // product features
    productFeature: _productFeautures,

    allProductFeatureNames: allProductFeatureNames
};