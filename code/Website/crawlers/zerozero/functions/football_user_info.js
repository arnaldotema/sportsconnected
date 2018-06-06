const zerozero = require('../crawler');
const proxyHandler = require('../proxy_handler');
const utf8 = require('utf8');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
var format = require("string-template");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const footballUserInfo = require('../../../models/football_user_info');
const footballUserInfoCrawler = require('../functions/football_match');

const updateUserInfo = function (err, res, done){

    const user_info = {
        personal_info: {
            name: '',
            avatar: '',
            positions: [],
            height: 0,
            weight: 0,
            date_of_birth: Date.now(),
            foot: '',
            updated_at: Date.now()
        }
    };

    const avatar_link = res.$("#page_header .logo img")[0].attribs["data-cfsrc"];
    user_info.personal_info.avatar = "https://www.zerozero.pt" + avatar_link;

    res.$("#entity_bio .bio").each(function(){
        let parsedData = res.$(this).html().split("<span>");
        if(parsedData.length < 2){
            //logger.error("Can't parse player info due to html misformation");
        }
        else{
            parsedData = parsedData[1].split("</span>");
        }
        let attribute = entities.decode(parsedData[0]);
        let value = parsedData[1];
        switch(attribute) {
            case "Nome":
                user_info.personal_info.name = utf8.encode(value);
                break;
            case "Posição":
                value = value.split('<td>')[1].split('</td>')[0];
                user_info.personal_info.positions = value.split(" / ");
                break;
            default:
        }
    });

    res.$("#entity_bio .bio_half").each(function(){
        let parsedData = res.$(this).html().split("<span>");
        if(parsedData.length < 2){
            logger.error("Can't parse player info due to html misformation");
        }
        else{
            parsedData = parsedData[1].split("</span>");
        }
        let attribute = entities.decode(parsedData[0]);
        let value = parsedData[1];
        switch(attribute) {
            case "Nacionalidade":
                value = value.split('<div class="text">')[1].split("</div>")[0];
                user_info.personal_info.nationality = value;
                break;
            case "Nascimento":
                user_info.personal_info.date_of_birth = new Date(value.match(/\d+-\d+-\d+/g)[0]);
                break;
            case "Pé preferencial":
                user_info.personal_info.foot = utf8.encode(value);
                break;
            case "Altura":
                user_info.personal_info.height = value.match(/\d+/g)[0];
                break;
            case "Peso":
                user_info.personal_info.weight = value.match(/\d+/g)[0];
                break;
            default:
        }
    });

    logger.info("User Info:")
    logger.info(user_info);

    const query = {"external_ids.zerozero": res.options.zerozeroId};

    footballUserInfo.update(query, user_info, { upsert:true, setDefaultsOnInsert: true, new: true }, function (err, info) {
        if (err) {
            logger.error(err);
            done();
        }
        else {
            logger.info("Successfully updated User_Info " + res.options.zerozeroId);
            logger.info(info);
            done();
        }
    });
};

module.exports = {
    updateUserInfo: updateUserInfo
}
