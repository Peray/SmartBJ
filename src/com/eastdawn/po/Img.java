package com.eastdawn.po;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Img implements Serializable {
	
	private Long imgId;//图片ID
	private String imgName;//图片名称
	private String onlinePath;//图片存储路径
	private Long parentId;//所属记录ID

	public Long getImgId() {
		return imgId;
	}
	public void setImgId(Long imgId) {
		this.imgId = imgId;
	}
	public String getOnlinePath() {
		return onlinePath;
	}
	public void setOnlinePath(String onlinePath) {
		this.onlinePath = onlinePath;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public String getImgName() {
		return imgName;
	}
	public void setImgName(String imgName) {
		this.imgName = imgName;
	}
}