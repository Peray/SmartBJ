package com.eastdawn.bo.impl;

import com.eastdawn.dao.QiyeDao;
import com.eastdawn.bo.QiyeBO;
import com.eastdawn.common.CommonBO;
import com.eastdawn.po.QiyeUser;

@SuppressWarnings("serial")
public class QiyeBOImpl extends CommonBO implements QiyeBO {
	private QiyeDao qiyeDao;
 
	
	public Long add(QiyeUser qyUser) {
		qiyeDao.add(qyUser);
		return qyUser.getQiyeId();
	}
	public void updateById(QiyeUser qyUser) {
		qiyeDao.updateById(qyUser);
	}
	public QiyeDao getQiyeDao() {
		return qiyeDao;
	}
	public void setQiyeDao(QiyeDao qiyeDao) {
		this.qiyeDao = qiyeDao;
	}
}
