package com.eastdawn.bo.impl;

import com.eastdawn.bo.ImgBO;
import com.eastdawn.common.CommonBO;
import com.eastdawn.dao.ImgDao;
import com.eastdawn.po.Img;

@SuppressWarnings("serial")
public class ImgBOImpl extends CommonBO implements ImgBO {
	private ImgDao imgDao;

	public Long add(Img img) {
		imgDao.add(img);
		
		return img.getImgId();
	}
	
	public ImgDao getImgDao() {
		return imgDao;
	}

	public void setImgDao(ImgDao imgDao) {
		this.imgDao = imgDao;
	}

}