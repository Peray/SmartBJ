package com.eastdawn.po;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SuppressWarnings("serial")
public class QiyeUser implements Serializable {
	
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
	
}