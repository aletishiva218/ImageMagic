
let  tools=["blur",'grayscale','brightness','contrast','hue-rotate','invert','opacity','saturate','sepia'];
let container=document.createElement("div");
container.classList.add("container");
let editor_container=document.createElement("div");
editor_container.classList.add("editor-container");
let image_container=document.createElement("div");
image_container.classList.add("image-container");
let image_viewer=document.createElement("div");
image_viewer.classList.add("image-viewer");
let buttons=document.createElement("div");
buttons.classList.add("buttons");
buttons.setAttribute("id","choose-buttons");
let selectbutton=document.createElement("button");
selectbutton.setAttribute("id","select-image");
let selectbuttontext=document.createTextNode("Select Image");
selectbutton.appendChild(selectbuttontext);
buttons.appendChild(selectbutton);
image_viewer.appendChild(buttons);
let img=document.createElement("img");
img.setAttribute("id","image");
img.setAttribute("height","100%");
image_viewer.appendChild(img);
let remove_img=document.createElement("button");
remove_img.setAttribute("id","remove-img-button");
image_container.appendChild(image_viewer);
let download_image=document.createElement("button");
download_image.classList.add("download-image");
download_image.appendChild(document.createTextNode("Download"));
image_container.appendChild(download_image);
editor_container.appendChild(image_container);
let tools_container=document.createElement("div");
tools_container.classList.add("tools-container");
for(let i=0;i<9;i++)
{
  let tool_container=document.createElement("div");
  tool_container.classList.add("tool-container");
  let h3=document.createElement("span");
  h3.style.fontSize="25px"
  let h3text=document.createTextNode(tools[i]);
  h3.appendChild(h3text);
  tool_container.appendChild(h3);
  let input_field=document.createElement("div");
  input_field.classList.add("input-field");
  let rangescale=document.createElement("input");
  rangescale.setAttribute("step","1");
  rangescale.setAttribute("type","range");
  rangescale.setAttribute("id",tools[i]);
  if(i==0)
  {
    rangescale.setAttribute("min","0");
    rangescale.setAttribute("max","1000");
    rangescale.setAttribute("value","0");
  }
  if(i==1)
  {
    rangescale.setAttribute("min","0");
    rangescale.setAttribute("max","100");
    rangescale.setAttribute("value","0");
  }
  if(i==2)
  {
    rangescale.setAttribute("min","0");
    rangescale.setAttribute("max","200");
    rangescale.setAttribute("value","100");
  }
  if(i==3)
  {
    rangescale.setAttribute("min","1");
    rangescale.setAttribute("max","100");
    rangescale.setAttribute("value","1");
  }
  if(i==4)
  {
    rangescale.setAttribute("min","0");
    rangescale.setAttribute("max","1000");
    rangescale.setAttribute("value","0");
  }
  if(i==5)
  {
    rangescale.setAttribute("min","0");
    rangescale.setAttribute("max","100");
    rangescale.setAttribute("value","0");
  }
  if(i==6)
  {
    rangescale.setAttribute("min","0");
    rangescale.setAttribute("max","100");
    rangescale.setAttribute("value","100");
  }
  if(i==7)
  {
    rangescale.setAttribute("min","1");
    rangescale.setAttribute("max","100");
    rangescale.setAttribute("value","1");
  }
  if(i==8)
  {
    rangescale.setAttribute("min","0");
    rangescale.setAttribute("max","100"); 
    rangescale.setAttribute("value","0");
  }

  rangescale.classList.add("tools-input");
  rangescale.setAttribute("name",tools[i]);
  rangescale.disabled=true;
  input_field.appendChild(rangescale);
  let rangevalue=document.createElement("span");
  rangevalue.classList.add("tools-value");
  rangevalue.classList.add(tools[i]+"-value");
  input_field.appendChild(rangevalue);
  tool_container.appendChild(input_field);
  tools_container.appendChild(tool_container);
}

editor_container.appendChild(tools_container);
container.appendChild(editor_container);
let body=document.querySelector("body");
body.appendChild(container);
let values=[document.getElementById(tools[0]).value,document.getElementById(tools[1]).value,document.getElementById(tools[2]).value,document.getElementById(tools[3]).value,document.getElementById(tools[4]).value,document.getElementById(tools[5]).value,document.getElementById(tools[6]).value,document.getElementById(tools[7]).value,document.getElementById(tools[8]).value];
let rangevalues=document.querySelectorAll(".tools-value");
for(let i=0;i<9;i++)
  rangevalues[i].innerHTML=values[i];
selectbutton.onclick=()=>{
  let file=document.createElement("input");
file.setAttribute("type","file");
file.setAttribute("accept","image/*");
file.setAttribute("id","file-click");
buttons.appendChild(file);
  file.click();
 file.addEventListener("change",(event)=>{
  let fileready=event.target.files[0];
  if(fileready)
  {
    download_image.classList.add("display-block");
    Array.from(tools).forEach((e)=>{
      let ranges=document.getElementById(e);
      ranges.disabled=false;
    })
    image_viewer.appendChild(remove_img);
    image_viewer.removeChild(buttons);
    img.setAttribute("src",`${URL.createObjectURL(fileready)}`);
    let filtervalue="";
    Array.from(tools).forEach((e,index)=>{
            let range=document.getElementById(e);
              range.addEventListener("input",()=>{
                values[index]=range.value;
                rangevalues[index].innerHTML=values[index];
                filtervalue=`${tools[0]}(${values[0]}px) ${tools[1]}(${values[1]}%) ${tools[2]}(${values[2]}%) ${tools[3]}(${values[3]}) ${tools[4]}(${values[4]}deg) ${tools[5]}(${values[5]}%) ${tools[6]}(${values[6]}%) ${tools[7]}(${values[7]}) ${tools[8]}(${values[8]}%)`;
                img.style.filter=filtervalue;
              
            })
        })
        download_image.onclick=()=>{
    let canvas=document.createElement('canvas');
    let newimage=canvas.getContext('2d')
    canvas.width=img.naturalWidth;
    canvas.height=img.naturalHeight;
    newimage.filter=filtervalue;
    newimage.drawImage(img,0,0,canvas.width,canvas.height);
       let a=document.createElement("a");
       a.download="convertedImage.jpg";
       a.href=canvas.toDataURL();
       a.click();
   
        }
        
  }
 
 })
}
remove_img.onclick=()=>{
  download_image.classList.remove("display-block");
  image_viewer.removeChild(remove_img);
  image_viewer.appendChild(buttons);
 img.setAttribute("src","");
 for(let i=0;i<9;i++)
 {
      let ranges=document.getElementById(tools[i]);
  ranges.disabled=true;
 }
}

let createElement=(imgheight,imgwidth,imgfilter,img)=>{

  
}
