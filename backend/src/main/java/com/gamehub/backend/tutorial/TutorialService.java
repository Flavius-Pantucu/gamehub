package com.gamehub.backend.tutorial;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class TutorialService {

    @Autowired
    TutorialRepository tutorialRepository;

    @Transactional
    public List<Tutorial> findByPublished(boolean published){
        return tutorialRepository.findByPublished(published);
    }
}