package com.eastdawn.dao.oracle;

import java.util.List;
import java.util.Map;

import com.eastdawn.po.Img;
import com.eastdawn.common.CommonDao;
import com.eastdawn.dao.ImgDao;
import com.sun.org.apache.xml.internal.dtm.ref.DTMDefaultBaseIterators.ParentIterator;

public class ImgDaoImpl extends CommonDao implements ImgDao{
	
	public List<Img> queryImgByPage(Map queryMap) {
		return getSqlMapClientTemplate().queryForList("imgMap.queryImgByPage", queryMap);
	}
	public void add(Img img) {
		 getSqlMapClientTemplate().insert("imgMap.add", img);
	}
	public void deleteById(Long imgId) {
		getSqlMapClientTemplate().update("imgMap.deleteById", imgId);
	}
}
