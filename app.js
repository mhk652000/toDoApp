const express = require("express");
const bodyParser=require("body-parser");

const app= express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
let items=[];
let workItems=[];
app.get("/", function(req,res){
    let today=new Date();

    let options={
        weekday: "long",
        day:"numeric",
        month: "long"
    };



    let day=today.toLocaleDateString("en-US", options);
    
    res.render("list", {Title:day, newListItem:items});
    
});

app.post("/", function(req,res) {
    let item=req.body.todo;
    if(req.body.lBtn==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }

   
})


app.get("/work", function(req, res){
    res.render("list", {Title:"Work List", newListItem:workItems});
})

app.listen(3000, function(){
    console.log("Server Live on port 3k");
});