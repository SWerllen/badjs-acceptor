/**
 * Created by chriscai on 2015/1/23.
 */

var fs = require('fs');
var connect = require('connect'),
    log4js = require('log4js'),
    logger = log4js.getLogger();


var ProjectService = function (){
    connect()
        .use('/getProjects', connect.query())
        .use('/getProjects' , function (req ,res){
            var param = req.query;

            if(param.auth != "badjsAccepter" || !param.projectsId ){

            }else {
                global.projectsId = param.projectsId;

                fs.writeFile("./project.db",global.projectsId , function (){
                    logger.info('update project.db :' + global.projectsId);
                });
            }





            res.writeHead(200 );
            res.end();

        })
        .listen(9001);

    var data = fs.readFileSync("./project.db","utf-8");

    global.projectsId = data;

    logger.info('load project.db :' + global.projectsId);


}






module.exports = ProjectService;