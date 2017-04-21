package com.eastdawn.dao;

import java.util.List;
import java.util.Map;

import com.eastdawn.po.QiyeUser;

@SuppressWarnings("unchecked")
public interface QiyeDao {

	public List<QiyeUser> queryQiyeByPage(Map queryMap);
	public void deleteUpdateById(QiyeUser qyUser);
	public void updateById(QiyeUser qyUser);
	public void add(QiyeUser qyUser);
	public QiyeUser getQiyeById(Long qiyeId);
}
