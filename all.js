let data = [
    {
      content: "事項1",
      checked: false
    },
    {
      content: "事項2",
      checked: false
    },
    {
      content: "事項3",
      checked: false
    },
    {
      content: "事項4",
      checked: false
    },
    {
      content: "事項5",
      checked: false
    }
  ];
  
  const list = document.querySelector(".list");
  const input = document.querySelector("input");
  const btn_add = document.querySelector(".btn_add");


  // 原本的renderData(d)無法render出checked或沒checked的html

  // function renderData(d){
  //   let str = "";
  //   d.forEach(function(item,index){
  //     str += ` <li>
  //           <label class="checkbox" data-num="${index}">
  //             <input type="checkbox" data-num="${index}"/>
  //             <span>${item.content}</span>
  //           </label>
  //           <a href="#" class="delete" data-num="${index}"></a>
  //         </li>`
  //   });
  //   list.innerHTML= str;
  // };

  // 新的renderData加上if判斷句，新增有含checked的HTML
  function renderData(d){
    let str = "";
    d.forEach(function(item,index){
      if(item.checked ===true){
        str += ` <li>
            <label class="checkbox" data-num="${index}">
              <input type="checkbox" data-num="${index}" checked/>
              <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
          </li>`;
      }else{
        str += ` <li>
            <label class="checkbox" data-num="${index}">
              <input type="checkbox" data-num="${index}"/>
              <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
          </li>`
      }
    });
    list.innerHTML= str;
  };
  
  renderData(data);
  
  // 1. 新增清單
  btn_add.addEventListener("click",function(e){
    if(input.value==""){
        alert("請輸入代辦事項")
        return;
    }
    e.preventDefault();
    let obj = {};
    obj.content = input.value;
    obj.checked = false; // 待辦事項狀態
    data.push(obj);

    // 確認目前active的欄位，並render相對應的data
    if(tab_all.classList.contains("active")===true){
      renderData(data);
    }else if(tab_unchecked.classList.contains("active")===true){
      filterDataUnchecked();
    }else if(tab_checked.classList.contains("active")===true){
      filterDatachecked();
    }
    input.value="";
    showUncheckedLength()
  });

  // 1. 刪除清單
  list.addEventListener("click",function(e){
    if(e.target.nodeName === "A"){
      let num = e.target.getAttribute("data-num");
      data.splice(num,1);
      // 確認目前active的欄位，並render相對應的data
      if(tab_all.classList.contains("active")===true){
        renderData(data);
      }else if(tab_unchecked.classList.contains("active")===true){
        filterDataUnchecked();
      }else if(tab_checked.classList.contains("active")===true){
        filterDatachecked();
      }
      showUncheckedLength()
    }else{
        return;
    }
  });

  // 2. 改變待辦事項狀態 

  
  list.addEventListener("click",function(e){
    let num = e.target.getAttribute("data-num");
    console.log(num);
    if(e.target.nodeName === "INPUT"){
      if(data[num].checked === true){
        data[num].checked = false;
      }else{
        data[num].checked = true;
      }
      showUncheckedLength()
    };
  });



  // 3. 篩選是否完成

  const tab_all = document.querySelector(".tab_all");
  const tab_checked = document.querySelector(".tab_checked");
  const tab_unchecked = document.querySelector(".tab_unchecked");

    // tab轉換active函式

  function tabSwitch(targetContent){
    tab_all.classList.remove("active");
    tab_checked.classList.remove("active");
    tab_unchecked.classList.remove("active");
    if(targetContent === "全部"){
      tab_all.classList.add("active");
    }else if(targetContent === "待完成"){
      tab_unchecked.classList.add("active");
    }else if(targetContent === "已完成"){
      tab_checked.classList.add("active");
    }
  }

    // filter出完成與未完成的list // 改成不建立新陣列，只把符合條件的render出來，index就不會因為不同陣列而跑掉！
    function filterDatachecked(){
      let str = "";
      data.forEach(function(item,index){ 
        if(item.checked ===true){
          str += ` <li>
              <label class="checkbox" data-num="${index}">
                <input type="checkbox" data-num="${index}" checked/>
                <span>${item.content}</span>
              </label>
              <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
      }
      list.innerHTML= str;
    })};
    
    function filterDataUnchecked(){
      let str = "";
      data.forEach(function(item,index){
        if(item.checked ===false){
          str += ` <li>
              <label class="checkbox" data-num="${index}">
                <input type="checkbox" data-num="${index}"/>
                <span>${item.content}</span>
              </label>
              <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
      }
      list.innerHTML= str;
    })};
  
  

  tab_all.addEventListener("click",function(e){
    tabSwitch(e.target.textContent)
    renderData(data);
  })

  tab_checked.addEventListener("click",function(e){
    tabSwitch(e.target.textContent)
    filterDatachecked();
  })

  tab_unchecked.addEventListener("click",function(e){
    tabSwitch(e.target.textContent)
    filterDataUnchecked();
  })

  // 5. 顯示待完成清單長度

  const UncheckedLength = document.querySelector(".UncheckedLength");

  function showUncheckedLength(){
    const dataUnchecked = data.filter(function(item){
      return item.checked === false;
    });
    UncheckedLength.textContent = `${dataUnchecked.length} 個待完成項目` ;
  };


  // 4. 清除全部已完成功能(用forEach刪掉)

  const btn_deleteCheckedList = document.querySelector(".deleteCheckedList");

  function deleteCheckedList(){
    
    const dataUnchecked = data.filter(function(item){
      return item.checked === false;
    });

    data = dataUnchecked;

    // 確認目前active的欄位，並render相對應的data
    if(tab_all.classList.contains("active")===true){
      renderData(data);
    }else if(tab_unchecked.classList.contains("active")===true){
      filterDataUnchecked();
    }else if(tab_checked.classList.contains("active")===true){
      filterDatachecked();
    }

    // 原本用forEach+splice，但發現刪除第一筆後，if判斷式就不會再跑了(forEach還會跑)
    // data.forEach(function(item,index){
    //   // console.log(item,index);
    //   if(item.checked===true){
    //     console.log(item,index);
    //     data.splice(index,1);
    //   }
      
    // })
    // renderData(data);
    
    };
  
  
    btn_deleteCheckedList.addEventListener("click",function(e){
      deleteCheckedList();
      showUncheckedLength()
    })
  