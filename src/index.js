export default from './Node';
export Directive from './Directive';
export MetaNode from './MetaNode';

// import MetaNode from './MetaNode';
//
// class RouteNode extends MetaNode {
//     constructor(json, pos, loc){
//         super(json, pos, loc);
//     }
// }
//
// let root = RouteNode.importFromJSON({
//     "children" : [
//         {
//             "path": "/",
//             "name": "인덱스",
//             "componentPath": "index",
//             "key" : "index",
//             "children" : []
//         },
//         {
//             "path": "/product",
//             "name": "상품",
//             "componentPath": null,
//             "key" : "product",
//             "children" : [
//                 {
//                     "path": "/product/",
//                     "name": "상품 인덱스",
//                     "componentPath": "product/index",
//                     "key" : "index",
//                     "children" : [
//
//                     ]
//                 },
//
//                 {
//                     "path": "/product/list",
//                     "name": "상품 인덱스",
//                     "componentPath": "product/list",
//                     "key" : "list",
//                     "children" : [
//
//                     ]
//                 },
//
//                 {
//                     "path": "/product/view",
//                     "name": "상품 인덱스",
//                     "componentPath": "product/view",
//                     "key" : "view",
//                     "children" : [
//
//                     ]
//                 }
//             ]
//         }
//     ]
// });
//
//
// console.log(root.visitRecursive((node)=>node.key === 'view'), root.__proto__.constructor);