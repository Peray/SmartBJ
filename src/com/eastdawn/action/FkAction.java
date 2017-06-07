package com.eastdawn.action;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.eastdawn.bo.FanKuiBO;
import com.eastdawn.bo.ImgBO;
import com.eastdawn.dao.FanKuiDao;
import com.eastdawn.dao.ImgDao;
import com.eastdawn.po.FanKui;
import com.eastdawn.po.Img;

@SuppressWarnings("serial")
public class FkAction{
	
	private Long fkId;//反馈ID
	private String content;//问题描述
	private String email;//联系邮箱
	private String telephone;//联系电话
//	private Date time;//申请时间
	private Long userId;//提交人ID
	private Integer status;//是否已读
	
	private String arlt;
	private Long imgId;//上传图片ID
	private String imgName;//图片名
	private ImgBO imgBO;
	private ImgDao imgDao;
	private List imgList;
	private Img img;
	
	private Long statr;
	private Long totalNum;
	
	private String fileName;
	
	private FanKui fk;

	private FanKuiDao fkDao;
	private FanKuiBO fkBO;
	private List fkList;
	
	//添加用户 
	public String add() throws Exception {
		HttpServletResponse response = ServletActionContext.getResponse();
		Map queryMap = new HashMap();
		FanKui fk = new FanKui();
		try {
			fk.setContent(this.content);
			fk.setEmail(this.email);
			fk.setTelephone(this.telephone);
			fk.setTime(new Date());
			fk.setUserId(this.userId);
			fk.setStatus(1);
			fkBO.add(fk);
			fkId = fkDao.getFKById(queryMap);
			System.out.println(fkId);
			if(this.arlt != null && !this.arlt.equals("")){
				this.imgAdd();
			}
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write("1");
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return null;
	}
	
	public String imgAdd() throws Exception {
		Img img = new Img();
		String []list=arlt.split(",");
		for(int i=1;i<list.length;i++){
		   img.setOnlinePath(list[i]);
		   img.setImgName(list[i]);
		   img.setParentId(this.fkId);
		   this.imgId = imgBO.add(img);
		}
	    return null;
	}
	
	//查询用户
	public String execute() throws Exception {
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse iResponse =ServletActionContext.getResponse();
		
		Map queryMap = new HashMap();
		try {
			if(this.fkId != null && !this.fkId.equals("")){
			    queryMap.put("fkId", fkId);
			}
			totalNum = fkDao.getFKCountByPage(queryMap);
			System.out.println(totalNum);
			System.out.println(statr+"--"+statr+'0'+"--"+statr+0);
			if(statr == null){
				queryMap.put("numStart", 0);
			}else{
				queryMap.put("numStart", (statr-1)*10);
			}
			fkList = fkDao.queryFKByPage(queryMap);
			
			JSONObject object = new JSONObject();  
	        object.put("num", totalNum); 
	        object.put("list", fkList); 
	        System.out.println(totalNum+object.toString());
	        iResponse.setCharacterEncoding("utf-8");
	        iResponse.getWriter().write(object.toString());
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
		return null;	
	}
	
	public String detail() throws ParseException, IOException{
		this.update();
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse iResponse =ServletActionContext.getResponse();
		Map queryMap = new HashMap();
		queryMap.put("fkId", fkId);
		queryMap.put("parentId", fkId);
		fkList = fkDao.queryFKByPage(queryMap);
		imgList = imgDao.queryImgByPage(queryMap);
		
		JSONObject object = new JSONObject();  
        object.put("list", fkList); 
        object.put("imgList", imgList); 
        System.out.println(object.toString());
        iResponse.setCharacterEncoding("utf-8");
        iResponse.getWriter().write(object.toString());
        
		return null;
	}
	
	public void delete() throws Exception{
		System.out.println("Start to execute delete Action!");
		HttpServletResponse iResponse =ServletActionContext.getResponse();
		HttpServletRequest request = ServletActionContext.getRequest();
		Map queryMap = new HashMap();
		String path = request.getSession().getServletContext().getRealPath("\\share");  
		
		try {
			fkId = Long.parseLong(request.getParameter("fkId"));
			queryMap.put("parentId", fkId);
			imgList = imgDao.queryImgByPage(queryMap);
			for(int i=0;i<imgList.size();i++){
				img = (Img)imgList.get(i);
		        String filePath = path + "\\" + img.getOnlinePath();
		        System.out.println(filePath);
		        File file = new File(filePath);
				if (file.exists() && file.isFile()) {
		            file.delete();
		           System.out.println("删除成功");
		        } 
			}
			fkDao.deleteById(fkId);
			imgDao.deleteById(fkId);
			iResponse.getWriter().write("1");
		} catch (Exception e) {
			e.printStackTrace();
			iResponse.getWriter().write("2");
		}
	}
	
	//内容更新
	public void update() throws ParseException{
		FanKui fk = new FanKui();
		fk.setFkId(getFkId());
		fk.setStatus(2);
		fkBO.updateById(fk);
	}
	
	public String deleteFile() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();
		String path = request.getSession().getServletContext().getRealPath("\\share");  
        System.out.println(path);
        String filePath = path + "\\" + this.fileName;
        System.out.println(filePath);
        File file = new File(filePath);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
            file.delete();
            response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write("1");
        } else {
        	response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write("2");
        }
		return null;
    }

	public Long getFkId() {
		return fkId;
	}

	public void setFkId(Long fkId) {
		this.fkId = fkId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

//	public Date getTime() {
//		return time;
//	}
//
//	public void setTime(Date time) {
//		this.time = time;
//	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getStatr() {
		return statr;
	}

	public void setStatr(Long statr) {
		this.statr = statr;
	}

	public Long getTotalNum() {
		return totalNum;
	}

	public void setTotalNum(Long totalNum) {
		this.totalNum = totalNum;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public FanKui getFk() {
		return fk;
	}

	public void setFk(FanKui fk) {
		this.fk = fk;
	}

	public FanKuiDao getFkDao() {
		return fkDao;
	}

	public void setFkDao(FanKuiDao fkDao) {
		this.fkDao = fkDao;
	}

	public FanKuiBO getFkBO() {
		return fkBO;
	}

	public void setFkBO(FanKuiBO fkBO) {
		this.fkBO = fkBO;
	}

	public List getFkList() {
		return fkList;
	}

	public void setFkList(List fkList) {
		this.fkList = fkList;
	}

	public String getArlt() {
		return arlt;
	}

	public void setArlt(String arlt) {
		this.arlt = arlt;
	}

	public Long getImgId() {
		return imgId;
	}

	public void setImgId(Long imgId) {
		this.imgId = imgId;
	}

	public ImgBO getImgBO() {
		return imgBO;
	}

	public void setImgBO(ImgBO imgBO) {
		this.imgBO = imgBO;
	}

	public ImgDao getImgDao() {
		return imgDao;
	}

	public void setImgDao(ImgDao imgDao) {
		this.imgDao = imgDao;
	}

	public List getImgList() {
		return imgList;
	}

	public void setImgList(List imgList) {
		this.imgList = imgList;
	}

	public String getImgName() {
		return imgName;
	}

	public void setImgName(String imgName) {
		this.imgName = imgName;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Img getImg() {
		return img;
	}

	public void setImg(Img img) {
		this.img = img;
	}
}