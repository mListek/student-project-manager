package com.listek.studentprojectmanager.config;

import com.listek.studentprojectmanager.entity.Message;
import com.listek.studentprojectmanager.entity.Task;
import com.listek.studentprojectmanager.entity.Team;
import com.listek.studentprojectmanager.entity.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

    HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

    // disable HTTP methods for Team: PUT, POST, DELETE
    config.getExposureConfiguration()
        .forDomainType(Team.class)
        .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
        .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

    // disable HTTP methods for User: PUT, POST, DELETE
    config.getExposureConfiguration()
        .forDomainType(User.class)
        .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
        .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

    // disable HTTP methods for Task: PUT, POST, DELETE
    config.getExposureConfiguration()
        .forDomainType(Task.class)
        .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
        .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

    // disable HTTP methods for Message: PUT, POST, DELETE
    config.getExposureConfiguration()
            .forDomainType(Message.class)
            .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
            .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
  }
}
