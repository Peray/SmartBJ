package com.eastdawn.bo.impl;

import com.eastdawn.dao.FanKuiDao;
import com.eastdawn.bo.FanKuiBO;
import com.eastdawn.common.CommonBO;
import com.eastdawn.po.FanKui;

@SuppressWarnings("serial")
public class FanKuiBOImpl extends CommonBO implements FanKuiBO {
	private FanKuiDao fkDao;
 
	public Long add(FanKui fk) {
		fkDao.add(fk);
		return fk.getFkId();
	}
	public void updateById(FanKui fk) {
		fkDao.updateById(fk);
	}

	public FanKuiDao getFkDao() {
		return fkDao;
	}

	public void setFkDao(FanKuiDao fkDao) {
		this.fkDao = fkDao;
	}
}
