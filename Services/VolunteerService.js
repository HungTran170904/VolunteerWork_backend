import RequestError from "../Errors/RequestError.js";
import Organization from "../Models/Organization.js";
import VolunteerWork from "../Models/VolunteerWork.js";
import CloudinaryService from "./CloudinaryService.js";

class VolunteerService{
          async addVolunteerWork(jsonData,file){     
                    var volunteerWork=JSON.parse(jsonData);   
                    if(!volunteerWork.title)  throw new RequestError("Title is required");  
                    volunteerWork.createdAt=new Date();
                    var org=await Organization.findById(volunteerWork.organization);
                    if(!org) throw new RequestError("OrganizationId "+volunteerWork.organization+" does not exist");  
                    volunteerWork.imageUrl=await CloudinaryService.uploadImage(file,null);
                    var savedVolunteerWork= await VolunteerWork.create(volunteerWork);
                    return savedVolunteerWork;
          }
          async getVolunteerWorks({page, limit}){
                    return await VolunteerWork.findWithPagination(page,limit);
          }
}
export default new VolunteerService();