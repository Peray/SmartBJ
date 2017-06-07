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
import com.eastdawn.dao.QiyeDao;
import com.eastdawn.bo.QiyeBO;
import com.eastdawn.po.QiyeUser;

@SuppressWarnings("serial")
public class QiyeAction{
	
	private Long qiyeId;//企业ID
	private String qiyeName;//企业名称
	private String lxrName;//联系人姓名
	private String telephone;//联系方式
	private String email;//邮箱
	private String websiteAdd;//服务应用网址
	private String faren;//公司法人
	private String zzImg;//营业执照复印件
	private Date sqTime;//申请日期
	private Integer status;//企业当前状态(0：提交申请、1审核通过、2试用期、3已付费、4注销)
	private Date tgTime;//审核通过日期
	private Long userId;//申请人ID
	private String term;//期限
	private String content;//未通过原因
	
	private Long statr;
	private Long totalNum;
	
	private String fileName;
	
	private QiyeUser qyUser;

	
	private QiyeDao qiyeDao;
	private QiyeBO qiyeBO;
	private List qiyeList;
	
	//用户名查询
	public String searchName() throws Exception {
		HttpServletResponse response = ServletActionContext.getResponse();
		Map queryMap = new HashMap();
		try {
			if(this.qiyeName!=null && !this.qiyeName.equals("")){
				queryMap.put("qiyeName", this.qiyeName);
			}else{
				queryMap.put("qiyeName", "12BNcv3d");
			}
			qiyeList=qiyeDao.queryQiyeByPage(queryMap);
			System.out.println(qiyeList.size()+"---"+qiyeList);
			if (qiyeList != null && qiyeList.size()> 0) {
				response.setCharacterEncoding("UTF-8"); 
				response.getWriter().write("1");
			}else{
				System.out.println("企业可申请。");
			}
		} catch (Exception e) {
			// TODO: handle exceptio
			e.printStackTrace();
		}
		
		return null;
	}
	//添加用户 
	public String add() throws Exception {
		HttpServletResponse response = ServletActionContext.getResponse();
		Map queryMap = new HashMap();
		QiyeUser qyUser = new QiyeUser();
		try {
			qyUser.setQiyeName(this.qiyeName);
			qyUser.setLxrName(this.lxrName);
			qyUser.setTelephone(this.telephone);
			qyUser.setEmail(this.email);
			qyUser.setWebsiteAdd(this.websiteAdd);
			qyUser.setFaren(this.faren);
		    qyUser.setZzImg(this.zzImg.substring(4));
			qyUser.setSqTime(new Date());
			qyUser.setStatus(0);
			qyUser.setUserId(this.userId);
			qyUser.setTerm(this.term);
			this.qiyeId = qiyeBO.add(qyUser);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write("1");
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return null;
	}
	
	//查询用户
	public String execute() throws Exception {
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse iResponse =ServletActionContext.getResponse();
		
		Map queryMap = new HashMap();
		try {
			if(this.qiyeId != null && !this.qiyeId.equals("")){
			    queryMap.put("qiyeId", qiyeId);
			}
			if(this.qiyeName != null && !this.qiyeName.equals("")){
			    queryMap.put("qiyeName", qiyeName);
			}
			if(this.userId != null && !this.userId.equals("")){
			    queryMap.put("userId", userId);
			}
			if(this.status != null && !this.status.equals("")){
			    queryMap.put("status", status);
			}
			totalNum = qiyeDao.getQiyeCountByPage(queryMap);
			System.out.println(totalNum);
			System.out.println(statr+"--"+statr+'0'+"--"+statr+0);
			if(statr == null){
				queryMap.put("numStart", 0);
			}else{
				queryMap.put("numStart", (statr-1)*10);
			}
			qiyeList = qiyeDao.queryQiyeByPage(queryMap);
			
			JSONObject object = new JSONObject();  
	        object.put("num", totalNum); 
	        object.put("list", qiyeList); 
	        System.out.println(totalNum+object.toString());
	        iResponse.setCharacterEncoding("utf-8");
	        iResponse.getWriter().write(object.toString());
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
		return null;	
	}
	
	//审核未通过原因
	public String deleteupdate() throws ParseException, IOException{	
		HttpServletResponse response = ServletActionContext.getResponse();
		QiyeUser qyUser = new QiyeUser();
		try {
			qyUser.setQiyeId(getQiyeId());
			qyUser.setStatus(getStatus());
			if(this.content != null && !this.content.equals("")){
				qyUser.setContent(getContent());
			}
			if(this.status == 2){
				qyUser.setTgTime(new Date());
			}
			qiyeDao.deleteUpdateById(qyUser);
			response.getWriter().write("1");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			response.getWriter().write("2");
		}
		return null;
	}

	public String detail() throws ParseException, IOException{
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse iResponse =ServletActionContext.getResponse();
		Map queryMap = new HashMap();
		queryMap.put("qiyeId", qiyeId);
		List qiyeList = qiyeDao.queryQiyeByPage(queryMap);
		
		JSONObject object = new JSONObject();  
        object.put("list", qiyeList); 
        System.out.println(object.toString());
        iResponse.setCharacterEncoding("utf-8");
        iResponse.getWriter().write(object.toString());
        
		return null;
	}
	
	//修改方法
	public String edit() throws ParseException, IOException{
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse iResponse =ServletActionContext.getResponse();
        Map queryMap = new HashMap();
        queryMap.put("qiyeId", qiyeId);
        qiyeList = qiyeDao.queryQiyeByPage(queryMap);
        
        JSONObject object = new JSONObject();  
        object.put("list", qiyeList); 
        System.out.println(object.toString());
        iResponse.setCharacterEncoding("utf-8");
        iResponse.getWriter().write(object.toString());
        
		return null;
	}
	//内容更新
	public String update() throws ParseException, IOException{
		HttpServletResponse response = ServletActionContext.getResponse();
		QiyeUser qyUser = new QiyeUser();
		try {
			System.out.println(getZzImg().substring(4));
			qyUser.setQiyeId(getQiyeId());
			qyUser.setQiyeName(getQiyeName());
			qyUser.setLxrName(getLxrName());
			qyUser.setTelephone(getTelephone());
			qyUser.setEmail(getEmail());
			qyUser.setWebsiteAdd(getWebsiteAdd());
			qyUser.setFaren(getFaren());
			qyUser.setZzImg(getZzImg().substring(4));
			qyUser.setTerm(getTerm());
			qyUser.setStatus(0);
			qiyeBO.updateById(qyUser);
			response.getWriter().write("1");
		} catch (Exception e) {
			// TODO: handle exception
			response.getWriter().write("2");
			e.printStackTrace();
		}
		
		return null;
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
	
	public Long getQiyeId() {
		return qiyeId;
	}
	public void setQiyeId(Long qiyeId) {
		this.qiyeId = qiyeId;
	}
	public String getQiyeName() {
		return qiyeName;
	}
	public void setQiyeName(String qiyeName) {
		this.qiyeName = qiyeName;
	}
	public String getLxrName() {
		return lxrName;
	}
	public void setLxrName(String lxrName) {
		this.lxrName = lxrName;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getWebsiteAdd() {
		return websiteAdd;
	}
	public void setWebsiteAdd(String websiteAdd) {
		this.websiteAdd = websiteAdd;
	}
	public String getFaren() {
		return faren;
	}
	public void setFaren(String faren) {
		this.faren = faren;
	}
	public String getZzImg() {
		return zzImg;
	}
	public void setZzImg(String zzImg) {
		this.zzImg = zzImg;
	}
	public Date getSqTime() {
		return sqTime;
	}
	public void setSqTime(Date sqTime) {
		this.sqTime = sqTime;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Date getTgTime() {
		return tgTime;
	}
	public void setTgTime(Date tgTime) {
		this.tgTime = tgTime;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public QiyeUser getQyUser() {
		return qyUser;
	}
	public void setQyUser(QiyeUser qyUser) {
		this.qyUser = qyUser;
	}
	public QiyeDao getQiyeDao() {
		return qiyeDao;
	}
	public void setQiyeDao(QiyeDao qiyeDao) {
		this.qiyeDao = qiyeDao;
	}
	public QiyeBO getQiyeBO() {
		return qiyeBO;
	}
	public void setQiyeBO(QiyeBO qiyeBO) {
		this.qiyeBO = qiyeBO;
	}
	public List getQiyeList() {
		return qiyeList;
	}
	public void setQiyeList(List qiyeList) {
		this.qiyeList = qiyeList;
	}
	public String getTerm() {
		return term;
	}
	public void setTerm(String term) {
		this.term = term;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
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
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
}