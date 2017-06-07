package com.eastdawn.dao;

import java.util.List;
import java.util.Map;

import com.eastdawn.po.Img;

public interface ImgDao {
	
	public List<Img> queryImgByPage(Map queryMap);
	
	public void add(Img img);
	
	public void deleteById(Long imgId);
	
}
