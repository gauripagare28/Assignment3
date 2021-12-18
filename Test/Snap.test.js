import { jsxEmptyExpression } from "@babel/types";
import React from "react";
import "react-native";
import  renderer ,{act} from "react-test-renderer";
import Home from "../Screens/Home";


// //console.log(tree)
// jest.runAllTimers()
// test("timeout",()=>{
//   const tree = renderer.create(<Home />).getInstance()
//     //act(()=>jest.runAllTimers())
//     let page = 0
//     page=page +1
//       let d=tree.getData(page)
//     expect(d).toEqual(page)
//    })

// test("snap",()=>{
//   expect(tree).toMatchSnapshot()
// })

// it("Snapshot test", () => {
//   const str = setInterval(() => {
//     const result = renderer.create(<Home />).toJSON();
//     expect(str).toMatchSnapshot(result)
//   },10000);
 
// });
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve(responseJson.hits),
//   })
// );

// it("finds exchange", async () => {
//   const rate = await result.getData();
//   expect(rate).toEqual(page);
//   expect(fetch).toHaveBeenCalledTimes(1);
// });


describe("App test case", () => {
  it("Snapshot test for app", () => {
    expect(<Home />).toMatchSnapshot();
  })

  // it("check app run without crashes", () => {
  //   const app = renderer.create(<Home />).toJSON();
  //   expect(app).toBeTruthy();
  // })

  // it("check app run without crashes", () => {
  //   const app = renderer.create(<Home />).root;
  //   console.log("app",app)
  //   const elementList = app.findAllByType("TextInput");
  //   expect(elementList.length).toBe(1);
  // })

})