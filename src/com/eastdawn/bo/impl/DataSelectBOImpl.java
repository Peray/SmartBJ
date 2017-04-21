package com.eastdawn.bo.impl;

import com.eastdawn.bo.DataSelectBO;
import com.eastdawn.common.CommonBO;
import com.eastdawn.dao.DataSelectDao;
import com.eastdawn.po.DataSelect;

@SuppressWarnings("serial")
public class DataSelectBOImpl extends CommonBO implements DataSelectBO {
	private DataSelectDao dataSelectDao;

	public DataSelect getDataSelectById(Long selectId) {
		return dataSelectDao.getDataSelectById(selectId);
	}
	public Long add(DataSelect dataSelect) {
		dataSelectDao.add(dataSelect);
		return dataSelect.getSelectId();
	}
	public void updateById(DataSelect dataSelect) {
		dataSelectDao.updateById(dataSelect);
	}
	public DataSelectDao getDataSelectDao() {
		return dataSelectDao;
	}
	public void setDataSelectDao(DataSelectDao dataSelectDao) {
		this.dataSelectDao = dataSelectDao;
	}
}