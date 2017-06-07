package com.eastdawn.po;

import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class FanKui implements Serializable {
	
	private Long fkId;//反馈ID
	private String content;//问题描述
	private String email;//联系邮箱
	private String telephone;//联系电话
	private Date time;//申请日期
	private Long userId;//提交人ID
	private Integer status;//是否已读
	
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
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
}